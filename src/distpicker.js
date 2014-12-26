/*!
 * Distpicker v@VERSION
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery', 'ChineseDistricts'], factory);
  } else {
    // Browser globals.
    factory(jQuery, ChineseDistricts);
  }
})(function ($, ChineseDistricts) {

  'use strict';

  if (typeof ChineseDistricts === 'undefined') {
    throw new Error('The file \'distpicker.data.js\' must be included first!');
  }

  var NAMESPACE = '.distpicker',
      EVENT_CHANGE = 'change' + NAMESPACE,

      Distpicker = function (element, options) {
        this.$element = $(element);
        this.defaults = $.extend({}, Distpicker.DEFAULTS, $.isPlainObject(options) ? options : {});
        this.placeholders = $.extend({}, Distpicker.DEFAULTS);
        this.active = false;
        this.init();
      };

  Distpicker.prototype = {
    constructor: Distpicker,

    data: ChineseDistricts,

    init: function () {
      var defaults = this.defaults,
          $select = this.$element.find('select'),
          length = $select.length,
          data = {};

      $select.each(function () {
        $.extend(data, $(this).data());
      });

      $.each(['province', 'city', 'district'], $.proxy(function (i, type) {
        if (data[type]) {
          defaults[type] = data[type];
          this['$' + type] = $select.filter('[data-' + type + ']');
        } else {
          this['$' + type] = length > i ? $select.eq(i) : null;
        }
      }, this));

      this.addListeners();
      this.reset(); // Reset all the selects.
      this.active = true;
    },

    addListeners: function () {
      if (this.$province) {
        this.$province.on(EVENT_CHANGE, $.proxy(function () {
          this.output('city');
          this.output('district');
        }, this));
      }

      if (this.$city) {
        this.$city.on(EVENT_CHANGE, $.proxy(function () {
          this.output('district');
        }, this));
      }
    },

    removeListeners: function () {
      if (this.$province) {
        this.$province.off(EVENT_CHANGE);
      }

      if (this.$city) {
        this.$city.off(EVENT_CHANGE);
      }
    },

    output: function (type) {
      var defaults = this.defaults,
          placeholders = this.placeholders,
          $select = this['$' + type],
          data = {},
          options = [],
          value,
          zipcode,
          matched;

      if (!$select || !$select.length) {
        return;
      }

      value = defaults[type];
      zipcode = (
        type === 'province' ? 1 :
        type === 'city'   ? this.$province && this.$province.find(':selected').data('zipcode') :
        type === 'district' ? this.$city && this.$city.find(':selected').data('zipcode') : zipcode
      );

      data = $.isNumeric(zipcode) ? this.data[zipcode] : null;

      if ($.isPlainObject(data)) {
        $.each(data, function (zipcode, address) {
          var selected = (address === value);

          if (selected) {
            matched = true;
          }

          options.push({
            zipcode: zipcode,
            address: address,
            selected: selected
          });
        });
      }

      if (!matched) {
        if (options.length && (defaults.autoSelect || defaults.autoselect)) {
          options[0].selected = true;
        }

        // Save the unmatched value as a placeholder at the first output
        if (!this.active && value) {
          placeholders[type] = value;
        }
      }

      // Add placeholder option
      if (defaults.placeholder) {
        options.unshift({
          zipcode: '',
          address: placeholders[type],
          selected: false
        });
      }

      $select.html(this.template(options));
    },

    template: function (options) {
      var html = '';

      $.each(options, function (i, option) {
        html += (
          '<option value="' +
          (option.address && option.zipcode ? option.address : '') +
          '"' +
          ' data-zipcode="' +
          (option.zipcode || '') +
          '"' +
          (option.selected ? ' selected' : '') +
          '>' +
          (option.address || '') +
          '</option>'
        );
      });

      return html;
    },

    reset: function (deep) {
      if (!deep) {
        this.output('province');
        this.output('city');
        this.output('district');
      } else if (this.$province) {
        this.$province.find(':first').prop('selected', true).trigger(EVENT_CHANGE);
      }
    },

    destroy: function () {
      this.removeListeners();
      this.$element.removeData('distpicker');
    }
  };

  Distpicker.DEFAULTS = {
    autoSelect: true,
    placeholder: true,
    province: '—— 省 ——',
    city: '—— 市 ——',
    district: '—— 区 ——'
  };

  Distpicker.setDefaults = function (options) {
    $.extend(Distpicker.DEFAULTS, options);
  };

  // Register as jQuery plugin
  $.fn.distpicker = function (options) {
    var args = [].slice.call(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data('distpicker'),
          fn;

      if (!data) {
        $this.data('distpicker', (data = new Distpicker(this, options)));
      }

      if (typeof options === 'string' && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });

    return (typeof result !== 'undefined' ? result : this);
  };

  $.fn.distpicker.Constructor = Distpicker;
  $.fn.distpicker.setDefaults = Distpicker.setDefaults;

  $(function () {
    $('[data-toggle="distpicker"],[data-distpicker],[distpicker]').distpicker();
  });
});
