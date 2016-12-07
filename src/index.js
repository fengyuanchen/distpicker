import $ from 'jquery';
import Distpicker from './distpicker';

const NAMESPACE = 'distpicker';
const OtherDistpicker = $.fn.distpicker;

$.fn.distpicker = function jQueryDistpicker(option, ...args) {
  let result;

  this.each(function each() {
    const $this = $(this);
    let data = $this.data(NAMESPACE);

    if (!data) {
      if (/destroy/.test(option)) {
        return;
      }

      const options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
      $this.data(NAMESPACE, (data = new Distpicker(this, options)));
    }

    if (typeof option === 'string') {
      const fn = data[option];

      if ($.isFunction(fn)) {
        result = fn.apply(data, args);
      }
    }
  });

  return typeof result !== 'undefined' ? result : this;
};

$.fn.distpicker.Constructor = Distpicker;
$.fn.distpicker.setDefaults = Distpicker.setDefaults;

$.fn.distpicker.noConflict = function noConflict() {
  $.fn.distpicker = OtherDistpicker;
  return this;
};

$(() => {
  $('[data-toggle="distpicker"]').distpicker();
});
