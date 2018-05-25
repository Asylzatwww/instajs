function likesOnMainPage()
{

    $(".coreSpriteDesktopNavLogoAndWordmark").attr("id","desktopNav");

    setTimeout(
        function(){
            document.getElementById("desktopNav").click();

            setTimeout(
                function(){

                    var i = 0;

                    var timerId = setInterval(function() {


                        $(".coreSpriteHeartOpen").parent().attr("id","prHeart");
                        /*$(".coreSpriteHeartFull").parent().attr("id","prHeart");*/

                        $(window).scrollTop(  $("#prHeart").offset().top );
                        document.getElementById("prHeart").click();

                        $("#prHeart").removeAttr("id");
                        console.log(i);

                        i++;
                        if ( ($("#prHeart").offset() == null) || (i > 100) )
                            clearInterval(timerId);
                    }, 600);

                }, 600
            );

        }, 600
    );

}

likesOnMainPage();