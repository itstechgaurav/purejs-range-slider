!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s=0)}([function(t,e,i){i(1),t.exports=i(2)},function(t,e,i){},function(t,e,i){(function(t){function e(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var i=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e.id,this.el=document.getElementById(e.id),this.completed=document.querySelector("#"+e.id+">.range-slider-completed"),this.checkAndSet(e),!this.verifyOps())return!1;this.init()}var i,n,s;return i=t,(n=[{key:"checkAndSet",value:function(t){this.isDragging=!1,window.currentElement=null,this.isVertical=this.el.classList.contains("range-slider-v"),this.value=t.value?t.value:0,this.min=t.min?t.min:0,this.max=t.max?t.max:100,this.step=t.step?t.step:1,this.input=t.input?t.input:function(){},this.created=t.created?t.created:function(){},this.changed=t.changed?t.changed:function(){},this.inInt=!0,this.step-Math.round(this.step)&&(this.defLength=(this.step+"").substring((this.step+"").indexOf(".")+1).length,this.inInt=!1)}},{key:"init",value:function(){this.events(),this.mobileEvents(),this.updateUi(this.value),this.created(this)}},{key:"events",value:function(t){this.el.addEventListener("mousedown",this.mousedown.bind(this)),window.addEventListener("mousemove",this.mousemove.bind(this)),window.addEventListener("mouseup",this.mouseup.bind(this))}},{key:"mobileEvents",value:function(t){this.el.addEventListener("touchstart",this.touchstart.bind(this)),window.addEventListener("touchmove",this.touchmove.bind(this)),window.addEventListener("touchend",this.tochend.bind(this))}},{key:"mousedown",value:function(t){this.isDragging=!0,window.currentElement=this.el}},{key:"mousemove",value:function(t){this.el;if(this.isDragging&&(window.currentElement=this.el)){var e=this.getValue(t);this.innerFunction(e)}}},{key:"mouseup",value:function(t){if(this.isDragging&&(window.currentElement=this.el)){var e=this.getValue(t);this.innerFunction(e),this.isDragging=!1,this.changed(this)}}},{key:"touchstart",value:function(t){this.isDragging=!0,window.currentElement=this.el}},{key:"touchmove",value:function(t){if(this.isDragging&&(window.currentElement=this.el)){var e=this.getValue(t.changedTouches[0]);this.innerFunction(e)}}},{key:"tochend",value:function(t){if(this.isDragging&&(window.currentElement=this.el)){var e=this.getValue(t.changedTouches[0]);this.innerFunction(e),this.isDragging=!1,this.changed(this)}}},{key:"getValue",value:function(t){var e=this.el.getBoundingClientRect(),i=0;return this.isVertical?(i=t.clientY-e.top,i/=e.height):(i=t.clientX-e.left,i/=e.width),(i*=100)>=99.9&&(i=100),i<=0&&(i=0),i}},{key:"getFinalValue",value:function(t){if(this.isVertical){var e=t*(this.max-this.min);e/=100,e=this.max-e,e=Math.round(e/this.step)*this.step,this.inInt||(e=parseFloat(Number(e).toFixed(this.defLength)));var i=e/(this.max-this.min);return(i*=100)>100&&(i=100),i<0&&(i=0),{val:e,to:i}}var n=this.max-this.min;n*=t/100;var s=Math.round(n/this.step)*this.step,a=(n=this.inInt?s:parseFloat(Number(s).toFixed(this.defLength)))/(this.max-this.min)*100;return a>100&&(a=100),a<0&&(a=0),{val:n+this.min,to:a}}},{key:"updateUi",value:function(){var t=this.value;t=this.isVertical?(this.max-t)/(this.max-this.min)*100:(t-this.min)/(this.max-this.min)*100;var e=this.getFinalValue(t);this.updateFinalUi(e)}},{key:"updateFinalUi",value:function(t){this.isVertical?t.val=this.updateVertical(t):this.completed.style.width=t.to+"%",this.current=t.val}},{key:"changeOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.value,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.min,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.max,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.step;this.verifyOps(t,e,i,n)&&(this.value=t,this.min=e,this.max=i,this.step=n,this.updateUi(),this.changed())}},{key:"verifyOps",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.value,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.min,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.max,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.step,s=!0,a=[];return e===i&&(a.push("Min And Max Values Should Not Be Equal"),s=!1),t<e&&(a.push("Current Value Should Be Greater Then Min Value"),s=!1),t>i&&(a.push("Current Value Should Be Less Then Max Value"),s=!1),0===n&&(a.push("Step Value Should Not to Be 0"),s=!1),s||(console.error("Error On Target",this.el),a.forEach(function(t){console.log("%c ".concat(t),"background-color: red; color: white; padding: 2px; border-radius: 2px;")})),s}},{key:"updateVertical",value:function(t){return t.val=Math.round(t.val/this.step)*this.step,this.inInt||(t.val=parseFloat(Number(t.val).toFixed(this.defLength))),t.val>this.max&&(t.val=this.max),t.val<this.min&&(t.val=this.min),t.to=(t.val-this.min)/(this.max-this.min)*100,this.completed.style.top=100-t.to+"%",this.completed.style.height=t.to+"%",t.val}},{key:"innerFunction",value:function(t){var e=this.getFinalValue(t);this.value=e.val,this.updateFinalUi(e),this.input(this)}}])&&e(i.prototype,n),s&&e(i,s),t}();window.rangeSlider=i,t.export=i}).call(this,i(3)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}}]);