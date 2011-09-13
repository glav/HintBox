/// <reference path="jquery-1.5.1-vsdoc.js" />

var HintBox = function (options) {

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
        backgroundColor: null
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

        //var pos = this.attachedTo.position();
        var elHeight = $(this.settings.attachedToElement)[0].offsetHeight;
        var elWidth = $(this.settings.attachedToElement)[0].offsetWidth;
        var elTop = $(this.settings.attachedToElement)[0].offsetTop;
        var elLeft = $(this.settings.attachedToElement)[0].offsetLeft;

        hintEl.css("position", "absolute");
        hintEl.css("top", elTop + "px");
        hintEl.css("left", elLeft + elWidth + "px");
        hintEl.css("margin", "2px 3px");
        hintEl.css("padding", "3px 5px");
    },

    attach: function () {

        var hintBoxHtml = this._constructHtml();
        var hintEl = $(hintBoxHtml);

        this.settings.attachedToElement.parent().append(hintEl);
        hintEl.hide();

        this._setDefaultStylingIfRequired(hintEl);

        this.settings.attachedToElement.focusin(function () {
            hintEl.fadeIn("fast");
        }).focusout(function () {
            hintEl.fadeOut("fast");
        });
    }

}
