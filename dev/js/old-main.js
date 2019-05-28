class rangeSlider {
    constructor(args) {
        this.id = args.id;
        this.el = document.getElementById(args.id);
        this.completed = document.querySelector("#" + args.id + ">.r-slider-completed");
        this.span = document.querySelector("#" + args.id + ">span");
        this.checkAndSet(args);
        this.init();
    }

    checkAndSet(ops) {
        this.isDragging = false;
        this.isVertical = this.el.classList.contains("r-slider-v");
        this.showValues = this.el.classList.contains("r-slider-show-value");
        this.current = ops.current ? ops.current : 0;
        this.min = ops.min ? ops.min : 0;
        this.max = ops.max ? ops.max : 100;
        this.step = ops.step ? ops.step : 1;
        this.input = ops.input ? ops.input : function(ops) {};
    }

    init() {
        this.events();
        this.mobileEvents();
        this.updateUi(this.current);
    }

    events(e) {
        this.el.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mousemove", this.mousemove.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));
    }

    mobileEvents(e) {
        this.el.addEventListener("touchstart", this.touchstart.bind(this));
        window.addEventListener("touchmove", this.touchmove.bind(this));
        window.addEventListener("touchend", this.tochend.bind(this));
    }

    mousedown() {
        this.isDragging = true;
    }

    mousemove(e) {
        let it = this.el;
        if (this.isDragging && (e.target === it || e.target === this.completed)) {
            let widthValue = this.getValue(e);
            this.innerFunction(widthValue);
        }
    }

    mouseup(e) {
        let it = this.el;
        this.isDragging = false;
        if (e.target === it || e.target === this.completed) {
            let widthValue = this.getValue(e);
            this.innerFunction(widthValue);
        }
    }

    touchstart(e) {
        let it = this.el;
        if (e.target === it || e.target === this.completed) {
            this.isDragging = true;
        }
    }

    touchmove(e) {
        let it = this.el;
        if (this.isDragging && (e.target === it || e.target === this.completed)) {
            let widthValue = this.getValue(e.changedTouches[0]);
            this.innerFunction(widthValue);
        }
    }

    tochend(e) {
        this.isDragging = false;
        if (e.target === this.el || e.target === this.completed) {
            let widthValue = this.getValue(e.changedTouches[0]);
            this.innerFunction(widthValue);
        }
    }

    getValue(ob) {
        let rect = this.el.getBoundingClientRect();
        let tmpVal = 0;
        if (this.isVertical) {
            tmpVal = (((ob.clientY - rect.top) / (rect.height / this.max)));
        } else {
            tmpVal = (((ob.clientX - rect.left) / (rect.width / (this.max + this.min))));
        }
        if (tmpVal > this.max) {
            tmpVal = this.max;
        }
        if (tmpVal < this.min) {
            tmpVal = this.min;
        }
        return tmpVal;
    }

    getFinalValue(currentValue) {
        currentValue = (Math.round(currentValue / this.step)) * this.step;
        currentValue = (function() {
            if(currentValue > this.max) {
                return this.max;
            }
            if(currentValue < this.min) {
                return this.min;
            }
            return currentValue;
        }.bind(this))();
        currentValue = this.isVertical ? (100 - currentValue) : currentValue;
        if (this.showValues) {
            this.el.dataset.completed = currentValue + "%";
        }
        this.current = currentValue;
        return currentValue;
    }

    updateUi(crnt) {
        let currentValue = (Math.round(crnt / this.step)) * this.step;
        currentValue = (function() {
            if(currentValue > this.max) {
                return this.max;
            }
            if(currentValue < this.min) {
                return this.min;
            }
            return currentValue;
        }.bind(this))();
        this.el.dataset.completed = currentValue + "%";
        if (this.isVertical) {
            this.el.style.transition = "0s";
            this.completed.style.height = currentValue + '%';
            this.completed.style.top = (100 - currentValue) + "%";
        } else {
            this.completed.style.width = ((currentValue / this.max) * 100) + '%';
        }
    }

    innerFunction(currentValue) {
        currentValue = this.getFinalValue(currentValue);
        if (this.isVertical) {
            this.el.style.transition = "0s";
            this.completed.style.height = currentValue + '%';
            this.completed.style.top = (100 - currentValue) + "%";
        } else {
            this.completed.style.width = ((currentValue / this.max) * 100) + '%';
        }
        this.input(this);
    }
}

window.rangeSlider = rangeSlider;