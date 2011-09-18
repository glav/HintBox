/// <reference path="jquery-1.5.1-vsdoc.js" />

(function ($) {

    $(document).ready(function () {
        var popup = new HintBox({
            attachToElementSelector: "#test-input",
            hintText: "Some helpfull Text",
            useDefaultStyle: true
        });

        var popup2 = new HintBox({
            attachToElementSelector: "#test-input2",
            hintText: "More shit",
            useDefaultStyle: true,
            position:"top-right"
        });

        $(".hintBox").each(function () {
            var popup = new HintBox({
                attachedToElement: $(this),
                //hintText: "multiple selection",
                useDefaultStyle: true
            });
        });

    });




})(jQuery);