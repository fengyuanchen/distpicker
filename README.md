# [District Picker](http://fengyuanchen.github.io/distpicker)

A jQuery plugin for pick provinces, citys and districts of China.


## Getting started

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

#### Initialize with `distpicker` attribute

##### Basic

```html
<div distpicker>
    <select></select>
    <select></select>
    <select></select>
</div>
```

##### Custom texts

```html
<div distpicker>
    <select data-province="---- 选择省 ----"></select>
    <select data-city="---- 选择市 ----"></select>
    <select data-district="---- 选择区 ----"></select>
</div>
```

##### Custom districts

```html
<div distpicker>
    <select data-province="浙江省"></select>
    <select data-city="杭州市"></select>
    <select data-district="滨江区"></select>
</div>
```

#### Initialize with `$.fn.distpicker` method

##### Basic
```javascript
$("#target").distpicker();
```

##### Custom texts:

```javascript
$("#target").distpicker({
    province: "---- 所在省 ----",
    city: "---- 所在市 ----",
    district: "---- 所在区 ----"
});
```

##### Custom districts:

```javascript
$("#target").distpicker({
    province: "浙江省",
    city: "杭州市",
    district: "滨江区"
});
```
