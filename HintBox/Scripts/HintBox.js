/// <reference path="jquery-1.5.1-vsdoc.js" />

var HintBox = function (options) {

    this.settings = $.extend({
        attachToElement: null,
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

    if (this.settings.attachToElement === null) {
        alert("Invalid options passed to HintBox");
    }
    this.attachedTo = $(this.settings.attachToElement);
    if (this.attachedTo.length === 0) {
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
        var html = "<div class='hint-box-container'><span>";
        html += this.settings.hintText;
        html += "</span></div>";
        return html;
    },

    attach: function () {

        var hintBoxHtml = this._constructHtml();
        var hintEl = $(hintBoxHtml);

        this.attachedTo.parent().append(hintEl);
        hintEl.hide();

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
        var elHeight = $(this.attachedTo)[0].offsetHeight;
        var elWidth = $(this.attachedTo)[0].offsetWidth;
        var elTop = $(this.attachedTo)[0].offsetTop;
        var elLeft = $(this.attachedTo)[0].offsetLeft;

        hintEl.css("position", "absolute");
        hintEl.css("top", elTop + "px");
        hintEl.css("left", elLeft +elWidth + "px");

        this.attachedTo.focusin(function () {
            hintEl.fadeIn("fast");
        }).focusout(function () {
            hintEl.fadeOut("fast");
        });
    }
}
