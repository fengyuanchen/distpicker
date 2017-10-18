import $ from 'jquery';
import Distpicker from './distpicker';
import {
  NAMESPACE,
  WINDOW,
} from './constants';

if ($.fn) {
  const AnotherDistpicker = $.fn.distpicker;

  $.fn.distpicker = function jQueryDistpicker(option, ...args) {
    let result;

    this.each((i, element) => {
      const $element = $(element);
      let data = $element.data(NAMESPACE);

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        const options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

        data = new Distpicker(element, options);
        $element.data(NAMESPACE, data);
      }

      if (typeof option === 'string') {
        const fn = data[option];

        if ($.isFunction(fn)) {
          result = fn.apply(data, args);
        }
      }
    });

    return typeof result === 'undefined' ? this : result;
  };

  $.fn.distpicker.Constructor = Distpicker;
  $.fn.distpicker.setDefaults = Distpicker.setDefaults;

  $.fn.distpicker.noConflict = function noConflict() {
    $.fn.distpicker = AnotherDistpicker;
    return this;
  };
}

if (WINDOW.document) {
  $(() => {
    $(`[data-toggle="${NAMESPACE}"]`).distpicker();
  });
}
