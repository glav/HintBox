/// <reference path="jquery-1.5.1-vsdoc.js" />

(function ($) {

    $(document).ready(function () {
        var popup = new HintBox({
            attachToElement: "#test-input",
            hintText: "Some helpfull Text",
            useDefaultStyle: true
        });

        var popup2 = new HintBox({
            attachToElement: "#test-input2",
            hintText: "More shit",
            useDefaultStyle: true
        });


    });




})(jQuery);