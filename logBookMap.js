var map = [
    'Hubbard, OH',
    'Mountain Top, PA',
    'East Stroudsburg, PA',
    'Walden, NY'
];

var ind = 0;

var j = 3;

var input;

function repeat() {

    if (ind < j) {
        $('.tactile-searchbox-input').each(function (i, obj) {
            console.log(i);
            $(".tactile-searchbox-input").trigger("focus");
            $(".tactile-searchbox-input").trigger("hover");



            if ($(obj).val() == "") $(obj).val(map[i]);
            ind = i;
            input = obj;
        });
        //$(input).attr("id", "prCancelFollow");

        setTimeout(
            function () {
                //document.getElementById("prCancelFollow").click();

                $('.searchbox-searchbutton').attr("id", "clickBtn");
                $('.add-waypoint-text').click();

                setTimeout(
                    function () {
                        //$(".tactile-searchbox-input").trigger("focus");
                        //$(".tactile-searchbox-input").trigger("hover");
                        //document.getElementById("clickBtn").click();
                        repeat();
                    }
                    , 500);

            }
            , 500);
    }

}

repeat();



