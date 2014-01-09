/*!
 * jQuery District Picker Plugin v0.1.0
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright 2014 Fenngyuan Chen
 * Released under the MIT license
 */
 
(function (fn, undefined) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as anonymous module.
		define(["jquery"], fn);
	} else {
		// Browser globals.
		fn(window.jQuery);
	}
}(function($) {
	
	"use strict";
	
	if (typeof DistPickerData === "undefined") {
		throw new Error("The file 'jquery.distpicker.data.js' must be included!");
	}
	
	function DistPicker(element, options) {
		this.$element = $(element);
		this.isSelected = false;
		this.init(options);
	}
	
	DistPicker.defaults = {
		province: "—— 省 ——",
		city: "—— 市 ——",
		district: "—— 区 ——"
	};
	
	DistPicker.prototype = {
		constructor: DistPicker,
		
		data: DistPickerData, // All districts of China
		
		init: function(options) {
			var $select = this.$element.find("select"),
				length = $select.length,
				$province = this.$element.find("select[data-province]"),
				$city = this.$element.find("select[data-city]"),
				$district = this.$element.find("select[data-district]"),
				settings = {},
				setting;
			
			if (length === 0) {
				return;
			}
			
			options = $.isPlainObject(options) ? options : {};
			
			$select.each(function() {
				$.extend(settings, $(this).data());
			});
			
			if (settings.province) {
				DistPicker.defaults.province = settings.province;
				this.$province = $select.filter("select[data-province]");
			} else {
				this.$province = length >= 0 ? $select.eq(0) : $select;
			}
			
			if (settings.city) {
				DistPicker.defaults.city = settings.city;
				this.$city = $select.filter("select[data-city]");
			} else {
				this.$city = length >= 1 ? $select.eq(1) : null;
			}
			
			if (settings.district) {
				DistPicker.defaults.district = settings.district;
				this.$district = $select.filter("select[data-district]");
			} else {
				this.$district = length >= 2 ? $select.eq(2) : null;
			}
			
			this.defaults = $.extend({}, DistPicker.defaults, options);
			this.active();
		},
		
		active: function() {
			this.output("province");
			this.output("city");
			this.output("district");
			this.change();
		},
		
		change: function() {
			var that = this;
			
			if (this.$province) {
				this.$province.change(function() {
					that.output("city");
					that.output("district");
				});
			}
			
			if (this.$city) {
				this.$city.change(function() {
					that.output("district");
				});
			}
		},
		
		output: function(type) {
			var zipcode = 1,
				data = {},
				options = [],
				option = "",
				$select = this["$" + type],
				that = this;
			
			if (!$select) {
				return;
			}
			
			option = this.defaults[type];
			zipcode = type === "province" ? 1 : 
			type === "city" ? this.$province.find("option:selected").data().zipcode : 
			type === "district" ? this.$city.find("option:selected").data().zipcode : zipcode;
			
			data = $.isNumeric(zipcode) ? this.data[zipcode] : {};
				
			$.each(data, function(zipcode, address) {
				var isSelected = address === option;
				
				if (isSelected) {
					that.isSelected = true;
				}
				
				options.push(that.template({
					zipcode: zipcode,
					address: address,
					selected: isSelected
				}));
			});
			
			if (!this.isSelected) {
				options.unshift(that.template({
					zipcode: "",
					address: option,
					selected: false
				}));
			}
			
			$select.html(options.join(""));
		},
		
		template: function(options) {
			var defaults = {
				zipcode: "",
				address: "",
				selected: false
			};
			
			$.extend(defaults, options);
			
			return [
				'<option value="',
				(defaults.address && defaults.zipcode ? defaults.address : ''),
				'" data-zipcode="',
				(defaults.zipcode ? defaults.zipcode : ''),
				'"',
				(defaults.selected ? ' selected' : ''),
				'>',
				defaults.address,
				'</option>'
			].join("");
		}
	};
	
	// define as a jquery method
	$.fn.distpicker = function(options) {
		return this.each(function() {
			$(this).data("distpicker", new DistPicker(this, options));
		});
	};
	
	$.fn.distpicker.Constructor = DistPicker;
	
	// auto init
	$(function() {
		$("*[data-distpicker]").distpicker();
	});

}));
