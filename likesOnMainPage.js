function likesOnMainPage()
{
    setTimeout(
        function(){

            var i = 0;

            var timerId = setInterval(function() {


                $(CLheart).parent().attr("id","CLheart");
                /*$(".coreSpriteHeartFull").parent().attr("id","CLheart");*/

                if ( ( $("#CLheart").length == 0 ) || ($("#CLheart").offset() == null) || (i > 100) ){
                    clearInterval(timerId);
                    return;
                }

                $(window).scrollTop(  $("#CLheart").offset().top );
                document.getElementById("CLheart").click();

                $("#CLheart").removeAttr("id");
                console.log(i);

                i++;
            }, 600);

        }, 600
    );

}

likesOnMainPage();