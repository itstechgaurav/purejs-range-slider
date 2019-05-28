# PureJS Range Slider [Demo](https://epicofjs.com/project/purejs-range-slider-55/full)


#### Features &nbsp;&nbsp;&nbsp; 📺

- Pure Native Javascript (No Jquery)
- Fully Responsive
- Vertical Slider also Available
- File Size
    - js (6KB) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; gzip (1.91Kb)
    - css (1.05KB) &nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; gzip (423 bytes)
    
- Easily Customizeable
- Can be used without input tag
- Full Browser Support
- Feel Free To submit any error
- A video tutorial is also available

#### See This Picture For More Clear Look

![Demo Picture](https://i.imgur.com/y6sAqUQ.png);


## Syntax 

```html
    <div id="demo" class="range-slider">
        <div class="range-slider-completed"></div>
    </div>

```

```js

new rangeSlider({
    id: "demo",  // this is a normal id without input[type='range']
    min: 0, // optional       |  Default: 0
    max: 20, // optional      |  Default: 100
    step: 1, // optional      |  Default: 1
    current: 0, // optional   |  Default: 0
    input: function() {   // Optional
        console.log(this.current);
    },
    changed: function() { // Optional
        console.log(this.current);
    },
    created: function() { // Optional
        console.log(this);
    }
});


```

####  Here Is The Browser Supprt

![Browser Support](https://i.imgur.com/vbpVlZa.jpg)

Build With Love ❤  By [😎 Gaurav Bhardwaj 😎](https://twitter.com/GauravB06316949)

