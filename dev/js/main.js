class rangeSlider {
    constructor(args) {
        this.id = args.id;
        this.el = document.getElementById(args.id);
        this.completed = document.querySelector("#" + args.id + ">.range-slider-completed");
        this.checkAndSet(args);
        if (!this.verifyOps()) return false;
        this.init();
    }

    checkAndSet(ops) {
        this.isDragging = false;
        window.currentElement = null;
        this.isVertical = this.el.classList.contains("range-slider-v");
        this.value = ops.value ? ops.value : 0;
        this.min = ops.min ? ops.min : 0;
        this.max = ops.max ? ops.max : 100;
        this.step = ops.step ? ops.step : 1;
        this.input = ops.input ? ops.input : function () {};
        this.created = ops.created ? ops.created : function () {};
        this.changed = ops.changed ? ops.changed : function () {};

        // Checking is Integer or decimal or upto how much decimal

        this.inInt = true;
        let def = this.step - Math.round(this.step);
        if (def) {
            this.defLength = ((this.step + "").substring((this.step + "").indexOf(".") + 1)).length;
            this.inInt = false;
        }
    }

    init() {
        this.events();
        this.mobileEvents();
        this.updateUi(this.value);
        this.created(this);
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

    mousedown(e) {
        this.isDragging = true;
        window.currentElement = this.el;
    }

    mousemove(e) {
        let it = this.el;
        if (this.isDragging && (window.currentElement = this.el)) {
            let widthValue = this.getValue(e);
            this.innerFunction(widthValue);
        }
    }

    mouseup(e) {
        if (this.isDragging && (window.currentElement = this.el)) {
            let widthValue = this.getValue(e);
            this.innerFunction(widthValue);
            this.isDragging = false;
            this.changed(this);
        }
    }

    touchstart(e) {
        this.isDragging = true;
        window.currentElement = this.el;
    }

    touchmove(e) {
        if (this.isDragging && (window.currentElement = this.el)) {
            let widthValue = this.getValue(e.changedTouches[0]);
            this.innerFunction(widthValue);
        }
    }

    tochend(e) {
        if (this.isDragging && (window.currentElement = this.el)) {
            let widthValue = this.getValue(e.changedTouches[0]);
            this.innerFunction(widthValue);
            this.isDragging = false;
            this.changed(this);
        }
    }

    getValue(ob) {
        let rect = this.el.getBoundingClientRect();
        let bp = 0;
        if (this.isVertical) {
            bp = ob.clientY - rect.top;
            bp = bp / rect.height;
        } else {
            bp = ob.clientX - rect.left;
            bp = bp / rect.width;
        }
        bp = bp * 100;

        if (bp >= 99.9) {
            bp = 100;
        }
        if (bp <= 0) {
            bp = 0;
        }
        return bp;
    }

    getFinalValue(currentValue) {
        if (!this.isVertical) {
            let scaleUpto = this.max - this.min;
            scaleUpto = scaleUpto * (currentValue / 100);
            let tmpScale = Math.round(scaleUpto / this.step) * this.step;
            if (this.inInt) {
                scaleUpto = tmpScale;
            } else {
                scaleUpto = parseFloat(Number(tmpScale).toFixed(this.defLength));
            }
            let upto = 100 * ((scaleUpto) / (this.max - this.min));
            if (upto > 100) {
                upto = 100;
            }
            if (upto < 0) {
                upto = 0;
            }
            return {
                val: scaleUpto + this.min,
                to: upto
            }
        } else {

            let val = currentValue * (this.max - this.min);
            val = val / 100;
            val = this.max - val;
            val = Math.round(val / this.step) * this.step;
            if(!this.inInt) {
                val = parseFloat(Number(val).toFixed(this.defLength));
            }

            let upto = ( val ) / (this.max - this.min);
            upto = upto * 100;
            if (upto > 100) {
                upto = 100;
            }
            if (upto < 0) {
                upto = 0;
            }

            return {
                val: val,
                to: upto
            }

        }
    }

    updateUi() {
        let crnt = this.value;
        if (this.isVertical) {
            crnt = ((this.max - crnt) / (this.max - this.min)) * 100;
        } else {
            crnt = ((crnt - this.min) / (this.max - this.min)) * 100;
        }
        var final = this.getFinalValue(crnt);
        this.updateFinalUi(final);
    }

    updateFinalUi(final) {
        if (this.isVertical) {
            final.val = this.updateVertical(final);
        } else {
            this.completed.style.width = final.to + "%";
        }
        this.current = final.val;
    }

    changeOptions(value = this.value, min = this.min, max = this.max, step = this.step) {
        if (this.verifyOps(value, min, max, step)) {
            this.value = value;
            this.min = min;
            this.max = max;
            this.step = step;
            this.updateUi();
            this.changed();
       }
    }

    verifyOps(value = this.value, min = this.min, max = this.max, step = this.step) {
        let isValid = true;
        let errors = [];


        if (min === max) {
            errors.push(`Min And Max Values Should Not Be Equal`);
            isValid = false;
        }

        if (value < min) {
            errors.push("Current Value Should Be Greater Then Min Value");
            isValid = false;
        }

        if (value > max) {
            errors.push("Current Value Should Be Less Then Max Value");
            isValid = false;
        }

        if (step === 0) {
            errors.push("Step Value Should Not to Be 0");
            isValid = false;
        }

        if (!isValid) {

            console.error("Error On Target", this.el);

            errors.forEach(function (it) {
                console.log(`%c ${it}`, "background-color: red; color: white; padding: 2px; border-radius: 2px;");
            });
        }

        return isValid;
    }

    updateVertical(final) {
        final.val = Math.round(final.val / this.step) * this.step;
        if (!this.inInt) {
            final.val = parseFloat(Number(final.val).toFixed(this.defLength));
        }

        if (final.val > this.max) {
            final.val = this.max;
        }

        if (final.val < this.min) {
            final.val = this.min;
        }

        final.to = ((final.val - this.min) / (this.max - this.min)) * 100;

        this.completed.style.top = (100 - final.to) + "%";
        this.completed.style.height = (final.to) + "%";


        return final.val;
    }

    innerFunction(howMuch) {
        let final = this.getFinalValue(howMuch);
        this.value = final.val;
        this.updateFinalUi(final);
        this.input(this);
    }
}


window.rangeSlider = rangeSlider;

module.export = rangeSlider;
