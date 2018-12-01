import $ from 'jquery';
import DEFAULTS from './defaults';
import DISTRICTS from './districts';
import { EVENT_CHANGE } from './constants';

const DEFAULT_CODE = 100000;
const PROVINCE = 'province';
const CITY = 'city';
const DISTRICT = 'district';

export default class Distpicker {
  constructor(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
    this.placeholders = $.extend({}, DEFAULTS);
    this.ready = false;
    this.init();
  }

  init() {
    const { options } = this;
    const $selects = this.$element.find('select');
    const { length } = $selects;
    const data = {};

    $selects.each((i, select) => $.extend(data, $(select).data()));

    $.each([PROVINCE, CITY, DISTRICT], (i, type) => {
      if (data[type]) {
        options[type] = data[type];
        this[`$${type}`] = $selects.filter(`[data-${type}]`);
      } else {
        this[`$${type}`] = length > i ? $selects.eq(i) : null;
      }
    });

    this.bind();

    // Reset all the selects (after event binding)
    this.reset();
    this.ready = true;
  }

  bind() {
    if (this.$province) {
      this.$province.on(EVENT_CHANGE, (this.onChangeProvince = $.proxy(() => {
        this.output(CITY);
        this.output(DISTRICT, true);
      }, this)));
    }

    if (this.$city) {
      this.$city.on(
        EVENT_CHANGE,
        (this.onChangeCity = $.proxy(() => this.output(DISTRICT, true), this)),
      );
    }
  }

  unbind() {
    if (this.$province) {
      this.$province.off(EVENT_CHANGE, this.onChangeProvince);
    }

    if (this.$city) {
      this.$city.off(EVENT_CHANGE, this.onChangeCity);
    }
  }

  output(type, triggerEvent = false) {
    const { options, placeholders } = this;
    const $select = this[`$${type}`];

    if (!$select || !$select.length) {
      return;
    }

    let code;

    switch (type) {
      case PROVINCE:
        code = DEFAULT_CODE;
        break;

      case CITY:
        code = this.$province && (this.$province.find(':selected').data('code') || '');
        break;

      case DISTRICT:
        code = this.$city && (this.$city.find(':selected').data('code') || '');
        break;
    }

    const districts = this.getDistricts(code);
    const value = options[type];
    const data = [];
    let matched = false;

    if ($.isPlainObject(districts)) {
      $.each(districts, (i, name) => {
        const selected = name === value || i === String(value);

        if (selected) {
          matched = true;
        }

        data.push({
          name,
          selected,
          code: i,
          value: options.valueType === 'name' ? name : i,
        });
      });
    }

    if (!matched) {
      const autoselect = options.autoselect || options.autoSelect;

      if (data.length && ((type === PROVINCE && autoselect > 0)
        || (type === CITY && autoselect > 1)
        || (type === DISTRICT && autoselect > 2))) {
        data[0].selected = true;
      }

      // Save the unmatched value as a placeholder at the first output
      if (!this.ready && value) {
        placeholders[type] = value;
      }
    }

    // Add placeholder option
    if (options.placeholder) {
      data.unshift({
        code: '',
        name: placeholders[type],
        value: '',
        selected: false,
      });
    }

    if (data.length) {
      $select.html(this.getList(data));
    } else {
      $select.empty();
    }

    if (triggerEvent) {
      $select.trigger(EVENT_CHANGE);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getList(data) {
    const list = [];

    $.each(data, (i, n) => {
      const attrs = [
        `data-code="${n.code}"`,
        `data-text="${n.name}"`,
        `value="${n.value}"`,
      ];

      if (n.selected) {
        attrs.push('selected');
      }

      list.push(`<option ${attrs.join(' ')}>${n.name}</option>`);
    });

    return list.join('');
  }

  // eslint-disable-next-line class-methods-use-this
  getDistricts(code = DEFAULT_CODE) {
    return DISTRICTS[code] || null;
  }

  reset(deep) {
    if (!deep) {
      this.output(PROVINCE);
      this.output(CITY);
      this.output(DISTRICT);
    } else if (this.$province) {
      this.$province.find(':first').prop('selected', true).end().trigger(EVENT_CHANGE);
    }
  }

  destroy() {
    this.unbind();
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}
