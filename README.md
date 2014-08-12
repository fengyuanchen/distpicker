# [District Picker](http://fengyuanchen.github.io/distpicker)

A jQuery plugin for pick provinces, citys and districts of China.

- [Documentation](http://fengyuanchen.github.io/distpicker)


# Getting started

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/distpicker/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/distpicker.git`.
- Install with [NPM](http://npmjs.org): `npm install distpicker`.
- Install with [Bower](http://bower.io): `bower install distpicker`.


## Installation

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


## Usage

### Initialize with `distpicker` attribute

#### Basic

```html
<div distpicker>
    <select></select>
    <select></select>
    <select></select>
</div>
```

#### Custom texts

```html
<div distpicker>
    <select data-province="---- 选择省 ----"></select>
    <select data-city="---- 选择市 ----"></select>
    <select data-district="---- 选择区 ----"></select>
</div>
```

#### Custom districts

```html
<div distpicker>
    <select data-province="北京"></select>
    <select data-city="北京市"></select>
    <select data-district="朝阳区"></select>
</div>
```


### Initialize with `$.fn.distpicker` method

#### Basic
```javascript
$("#target").distpicker();
```

#### Custom texts:

```javascript
$("#target").distpicker({
    province: "---- 所在省 ----",
    city: "---- 所在市 ----",
    district: "---- 所在区 ----"
});
```

#### Custom districts:

```javascript
$("#target").distpicker({
    province: "北京",
    city: "北京市",
    district: "朝阳区"
});
```


## Browser Support

- IE 6+
- Chrome 33+
- Firefox 27+
- Safari 5.1+
- Opera 19+

As a jQuery plugin, you can reference to the [jQuery Browser Support](http://jquery.com/browser-support/).


## [License](https://github.com/fengyuanchen/distpicker/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
