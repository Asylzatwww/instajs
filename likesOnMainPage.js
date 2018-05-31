function likesOnMainPage()
{
    var prHeart = ".ptsdu";

    setTimeout(
        function(){

            var i = 0;

            var timerId = setInterval(function() {


                $(prHeart).parent().attr("id","prHeart");
                /*$(".coreSpriteHeartFull").parent().attr("id","prHeart");*/

                if ( ( $("#prHeart").length == 0 ) || ($("#prHeart").offset() == null) || (i > 100) ){
                    clearInterval(timerId);
                    return;
                }

                $(window).scrollTop(  $("#prHeart").offset().top );
                document.getElementById("prHeart").click();

                $("#prHeart").removeAttr("id");
                console.log(i);

                i++;
            }, 600);

        }, 600
    );

}

likesOnMainPage();