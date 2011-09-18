/// <reference path="jquery-1.5.1-vsdoc.js" />

var HintBox = function (options) {

    this._positionOptions = {};
    this._positionOptions.right = "right";
    this._positionOptions.left = "left";
    this._positionOptions.topRight = "top-right";
    this._positionOptions.bottomRight = "bottom-right";
    this._positionOptions.topLeft = "top-left";
    this._positionOptions.bottomLeft = "bottom-left";
    this._positionOptions.aboveCenter = "above-center";
    this._positionOptions.belowCenter = "below-center";

    this.settings = $.extend({
        attachToElementSelector: null,
        attachedToElement: null,
        hintText: "",
        width: null,
        height: null,
        roundedCorners: false,
        shadows: false,
        shadowColor: "#CCC",
        roundedCornerSize: "4px",
        shadowDepth: "4px",
        useDefaultStyle: false,
        backgroundColor: null,
        position: "auto"  // this could be left, right, top, bottom, top-right etc...
    }, options);

    this.dataAttributeName = "data-hint-text";

    if (this.settings.attachToElementSelector === null && this.settings.attachedToElement === null) {
        alert("Invalid options passed to HintBox");
    }

    if (this.settings.attachToElementSelector !== null) {
        this.settings.attachedToElement = $(this.settings.attachToElementSelector);
    }

    if (this.settings.attachedToElement.length === 0) {
        alert("Invalid element to attach to for HintBox");
    }

    if (this.settings.useDefaultStyle === true) {
        this.settings.roundedCorners = true;
        this.settings.shadows = true;
        this.settings.width = "200px";
        this.settings.height = "100px";
        this.settings.backgroundColor = "#FFFFFF";
    }

    this.attach();
}

HintBox.prototype = {

    _constructHtml: function () {
        var hintText = this.settings.hintText;
        if (!hintText || hintText === null || hintText === "") {
            hintText = $(this.settings.attachedToElement).attr(this.dataAttributeName);
        }
        var html = "<div class='hint-box-container'><span>";
        html += hintText;
        html += "</span></div>";
        return html;
    },

    _setPosition: function (hintEl) {
        var jQueryEl = $(this.settings.attachedToElement);
        var elHeight = jQueryEl[0].offsetHeight;
        var elWidth = jQueryEl[0].offsetWidth;
        var elTop = jQueryEl[0].offsetTop;
        var elLeft = jQueryEl[0].offsetLeft;

        hintEl.css("position", "absolute");
        var topPos = elTop;
        var leftPos = elLeft + elWidth;

        if (this.settings.position === "auto") {

            // todo: need to dynamically figure this out
            // If the position is auto, then we shall determine where to put the hint box.
            // typically we go the right, but re-adjust if the box is outside of the visible window

            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            if (leftPos + 400 > screenWidth) {
                hintEl.css("margin-left", "-400px");
            }
        } else {
            hintEl.css("left", "-9999px");  // hide the element offscreen and show it so we can calculate its dimensions
            hintEl.show();

            // Explicit positioning, so just do what we are told
            if (this.settings.position === this._positionOptions.right) {
                // this is default so leave it
            } else if (this.settings.position === this._positionOptions.bottomRight) {
                topPos = topPos + elHeight;
            } else if (this.settings.position === this._positionOptions.topRight) {
                topPos = topPos - hintEl[0].offsetHeight;
            } else if (this.settings.position === this._positionOptions.topLeft) {
                topPos = topPos - hintEl[0].offsetHeight;
                leftPos = leftPos - elWidth - hintEl[0].offsetWidth;
            } else if (this.settings.position === this._positionOptions.left) {
                leftPos = leftPos - elWidth - hintEl[0].offsetWidth;
            } else if (this.settings.position === this._positionOptions.topLeft) {
                topPos = topPos - elHeight;
                leftPos = leftPos - elWidth - hintEl[0].offsetWidth;
            } else if (this.settings.position === this._positionOptions.bottomLeft) {
                topPos = topPos + elHeight;
                leftPos = leftPos - elWidth - hintEl[0].offsetWidth;
            } else if (this.settings.position === this._positionOptions.aboveCenter) {
                topPos = topPos - hintEl[0].offsetHeight;
                var widthDiff = (hintEl[0].offsetWidth - elWidth) / 2;
                leftPos = (leftPos - elWidth) - widthDiff;
            } else if (this.settings.position === this._positionOptions.belowCenter) {
                topPos = topPos + elHeight;
                var widthDiff = (hintEl[0].offsetWidth - elWidth) / 2;
                leftPos = (leftPos - elWidth) - widthDiff;
            }

            hintEl.hide();

        }


        hintEl.css("top", topPos + "px");
        hintEl.css("left", leftPos + "px");
        hintEl.css("margin", "2px 3px");
        hintEl.css("padding", "3px 5px");
    },

    _setDefaultStylingIfRequired: function (hintEl) {
        if (this.settings.width && this.settings.width !== null) {
            hintEl.css("width", this.settings.width);
        }
        if (this.settings.height && this.settings.height !== null) {
            hintEl.css("height", this.settings.height);
        }

        if (this.settings.backgroundColor && this.settings.backgroundColor !== null) {
            hintEl.css("background-color", this.settings.backgroundColor);
        }


        if (this.settings.roundedCorners === true) {
            hintEl.css("border-radius", this.settings.roundedCornerSize);
            hintEl.css("-moz-border-radius", this.settings.roundedCornerSize);
            hintEl.css("-webkit-border-radius", this.settings.roundedCornerSize);
        }

        if (this.settings.shadows === true) {
            var shadowDefinition = "0px 0px " + this.settings.shadowDepth + " " + this.settings.shadowDepth + " " + this.settings.shadowColor;
            hintEl.css("box-shadow", shadowDefinition);
            hintEl.css("-moz-box-shadow", shadowDefinition);
            hintEl.css("-webkit-box-shadow", shadowDefinition);
        }

        this._setPosition(hintEl);
    },

    attach: function () {

        var self = this;

        var hintBoxHtml = this._constructHtml();
        var hintEl = $(hintBoxHtml);

        this.settings.attachedToElement.parent().append(hintEl);
        hintEl.hide();

        this._setDefaultStylingIfRequired(hintEl);

        this.settings.attachedToElement.focusin(function () {
            self._setDefaultStylingIfRequired(hintEl);
            hintEl.fadeIn("fast");
        }).focusout(function () {
            hintEl.fadeOut("fast");
        });
    }

}
