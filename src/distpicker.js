import $ from 'jquery';
import DEFAULTS from './defaults';
import DISTRICTS from './districts';

const NAMESPACE = 'distpicker';
const EVENT_CHANGE = `change.${NAMESPACE}`;
const DEFAULT_CODE = 100000;
const PROVINCE = 'province';
const CITY = 'city';
const DISTRICT = 'district';

export default class Distpicker {
  constructor(element, options) {
    const self = this;

    self.$element = $(element);
    self.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
    self.placeholders = $.extend({}, DEFAULTS);
    self.ready = false;
    self.init();
  }

  init() {
    const self = this;
    const options = self.options;
    const $selects = self.$element.find('select');
    const length = $selects.length;
    const data = {};

    $selects.each((i, select) => $.extend(data, $(select).data()));

    $.each([PROVINCE, CITY, DISTRICT], (i, type) => {
      if (data[type]) {
        options[type] = data[type];
        self[`$${type}`] = $selects.filter(`[data-${type}]`);
      } else {
        self[`$${type}`] = length > i ? $selects.eq(i) : null;
      }
    });

    self.bind();

    // Reset all the selects (after event binding)
    self.reset();
    self.ready = true;
  }

  bind() {
    const self = this;

    if (self.$province) {
      self.$province.on(EVENT_CHANGE, (self.onChangeProvince = $.proxy(() => {
        self.output(CITY);
        self.output(DISTRICT);
      }, self)));
    }

    if (self.$city) {
      self.$city.on(EVENT_CHANGE, (self.onChangeCity = $.proxy(() => self.output(DISTRICT), self)));
    }
  }

  unbind() {
    const self = this;

    if (self.$province) {
      self.$province.off(EVENT_CHANGE, self.onChangeProvince);
    }

    if (self.$city) {
      self.$city.off(EVENT_CHANGE, self.onChangeCity);
    }
  }

  output(type) {
    const self = this;
    const options = self.options;
    const placeholders = self.placeholders;
    const $select = self[`$${type}`];

    if (!$select || !$select.length) {
      return;
    }

    let code;

    switch (type) {
      case PROVINCE:
        code = DEFAULT_CODE;
        break;

      case CITY:
        code = self.$province && (self.$province.find(':selected').data('code') || '');
        break;

      case DISTRICT:
        code = self.$city && (self.$city.find(':selected').data('code') || '');
        break;
    }

    const districts = self.getDistricts(code);
    const value = options[type];
    const data = [];
    let matched = false;

    if ($.isPlainObject(districts)) {
      $.each(districts, (i, name) => {
        let selected = name === value;

        if (options.valueType === 'code') {
          selected = i === String(value);
        }

        if (selected) {
          matched = true;
        }

        data.push({
          code: i,
          name,
          selected,
        });
      });
    }

    if (!matched) {
      const autoselect = options.autoselect || options.autoSelect;

      if (data.length && ((type === PROVINCE && autoselect > 0) ||
        (type === CITY && autoselect > 1) ||
        (type === DISTRICT && autoselect > 2))) {
        data[0].selected = true;
      }

      // Save the unmatched value as a placeholder at the first output
      if (!self.ready && value) {
        placeholders[type] = value;
      }
    }

    // Add placeholder option
    if (options.placeholder) {
      data.unshift({
        code: '',
        name: placeholders[type],
        selected: false,
      });
    }

    if (data.length) {
      $select.html(self.getList(data));
    } else {
      $select.empty();
    }
  }

  getList(data) {
    const options = this.options;
    const list = [];

    $.each(data, (i, n) => {
      const attrs = [
        `data-code="${n.code}"`,
        `data-text="${n.name}"`,
        `value="${options.valueType === 'name' && n.code ? n.name : n.code}"`,
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
    const self = this;

    if (!deep) {
      self.output(PROVINCE);
      self.output(CITY);
      self.output(DISTRICT);
    } else if (self.$province) {
      self.$province.find(':first').prop('selected', true).trigger(EVENT_CHANGE);
    }
  }

  destroy() {
    const self = this;

    self.unbind();
    self.$element.removeData(NAMESPACE);
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}
