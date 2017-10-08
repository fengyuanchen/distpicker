import $ from 'jquery';
import Distpicker from './distpicker';
import {
  NAMESPACE,
} from './constants';

const OtherDistpicker = $.fn.distpicker;

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
  $.fn.distpicker = OtherDistpicker;
  return this;
};

$(() => {
  $(`[data-toggle="${NAMESPACE}"]`).distpicker();
});
