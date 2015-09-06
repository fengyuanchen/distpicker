# [Distpicker](https://github.com/fengyuanchen/distpicker)

> A simple jQuery plugin for picking provinces, cities and districts of China.

- [Demo](http://fengyuanchen.github.io/distpicker)



## Main

```
dist/
├── distpicker.js          (  7 KB)
├── distpicker.min.js      (  4 KB)
├── distpicker.data.js     (110 KB)
└── distpicker.data.min.js ( 76 KB)
```



## Getting started


### Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/distpicker/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/distpicker.git`.
- Install with [NPM](http://npmjs.org): `npm install distpicker`.
- Install with [Bower](http://bower.io): `bower install distpicker`.


### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/distpicker.data.js"></script>
<script src="/path/to/distpicker.js"></script>
```


Create HTML elements:

```html
<div><!-- container -->
  <select></select><!-- province -->
  <select></select><!-- city -->
  <select></select><!-- district -->
</div>
```



### Usage

#### Initialize with `data-toggle="distpicker"` attribute


Basic

```html
<div data-toggle="distpicker">
  <select></select>
  <select></select>
  <select></select>
</div>
```


Custom placeholders

```html
<div data-toggle="distpicker">
  <select data-province="---- 选择省 ----"></select>
  <select data-city="---- 选择市 ----"></select>
  <select data-district="---- 选择区 ----"></select>
</div>
```


Custom districts

```html
<div data-toggle="distpicker">
  <select data-province="浙江省"></select>
  <select data-city="杭州市"></select>
  <select data-district="西湖区"></select>
</div>
```


#### Initialize with `$.fn.distpicker` method

Basic

```js
$('#target').distpicker();
```

Custom placeholders

```js
$('#target').distpicker({
  province: '---- 所在省 ----',
  city: '---- 所在市 ----',
  district: '---- 所在区 ----'
});
```

Custom districts

```js
$('#target').distpicker({
  province: '浙江省',
  city: '杭州市',
  district: '西湖区'
});
```



## Options

- Change the default options with `$().distpicker(options)`.
- Change the global default options with `$.fn.distpicker.setDefaults(options)`.


### autoSelect

- Type: `Boolean`
- Default: `true`

Selects the city and district automatically when the province changes.


### placeholder

- Type: `Boolean`
- Default: `true`

Show placeholder (with an `<option>` element).


### province

- Type: `String`
- Default: `—— 省 ——`

Defines the initial value of province `<select>`. If it is a existing province in `distpicker.data.js`, it will be selected. If not, it will be used as a placeholder.


### city

- Type: `String`
- Default: `—— 市 ——`

Defines the initial value of city `<select>`. If it is a existing city under the selected province, it will be selected. If not, it will be used as a placeholder.


### district

- Type: `String`
- Default: `—— 区 ——`

Defines the initial value of district `<select>`. If it is a existing district under the selected city, it will be selected. If not, it will be used as a placeholder.



## Methods

### reset([deep])

- **deep** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Reset the selects to default states (Undo selected).

Reset the selects to the initial states (Undo changed).

**Examples:**

```js
$().distpicker('reset');
$().distpicker('reset', true);
```

### destroy()

Destroy the distpicker instance, but keep the selected districts.

If you want to remove the selected districts, you can call `reset` method first and then call this method.



## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.distpicker.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="distpicker.js"></script>
<script>
  $.fn.distpicker.noConflict();
  // Code that uses other plugin's "$().distpicker" can follow here.
</script>
```



## Browser support

- Chrome (latest 2)
- Firefox (latest 2)
- Internet Explorer 8+
- Opera (latest 2)
- Safari (latest 2)

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).



## [License](LICENSE.md)

[MIT](http://opensource.org/licenses/MIT) © [Fengyuan Chen](http://github.com/fengyuanchen)
