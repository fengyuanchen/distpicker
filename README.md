A simple, lightweight jQuery plugin for pick Chinese districts.

## Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/jquery.distpicker.data.js"></script>
<script src="/path/to/jquery.distpicker.js"></script>
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

### 1. Auto init by add the `data-distpicker` attribute to the container:

```html
<div data-distpicker>
	<select></select>
	<select></select>
	<select></select>
</div>
```

### 2. Init with the jQuery method `distpicker`:

```html
<div class="districts">
	<select></select>
	<select></select>
	<select></select>
</div>
```

```javascript
$(".districts").distpicker();
```

### 3. Init with a district value, which is a existing value from `jquery.distpicker.data.js`:

```html
<div data-distpicker>
	<select data-province="浙江省"></select>
	<select data-city="杭州市"></select>
	<select data-district="滨江区"></select>
</div>
```

Or

```html
<div class="districts">
	<select></select>
	<select></select>
	<select></select>
</div>
```

```javascript
$(".districts").distpicker({
	province: "浙江省",
	city: "杭州市",
	district: "滨江区"
});
```

### 4. Init with a custom message:

```html
<div data-distpicker>
	<select data-province="----选择省----"></select>
	<select data-city="----选择省----"></select>
	<select data-district="----选择省----"></select>
</div>
```

Or

```html
<div class="districts">
	<select></select>
	<select></select>
	<select></select>
</div>
```

```javascript
$(".districts").distpicker({
	province: "----选择省----",
	city: "----选择市----",
	district: "----选择区----"
});
```

