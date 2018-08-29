function prfollowOpen(ind, time) {

    setTimeout(
        function () {

            var linkForClick = $(".k9GMp").find("li:eq( " + ind + " )").find("a");
            linkForClick.attr("id", "prfollowing");

            if ($(linkForClick).length === 0) {
                window.history.back();

                sequenceInd = 0;
                eval(sequenceFunc[sequenceInd]);
            }
            else

                setTimeout(
                    function () {
                        document.getElementById("prfollowing").click();
                        linkForClick.removeAttr("id");

                        setTimeout(
                            function () {

                                sequenceInd++;
                                eval(sequenceFunc[sequenceInd]);

                            }, time
                        );
                    }, 600
                );

        }, 1000
    );
}


function followAndClickUser(){
    /********2********/
    $("._1xe_U").find("li").each(function(){
        var prUserBtn = $(this).find(CLbtnFollow);
        var prUser = $(this).find("a");
        if ( ($(prUserBtn).length !== 0) &&  (prUsersOld.indexOf( $(this).find("a").attr("href") ) < 0) ){

            $(prUserBtn).attr("id","clickToFollow");
            $(prUser).attr("id","clickUser");

            setTimeout(
                function(){

                    document.getElementById("clickToFollow").click();

                }, 1000
            );

            setTimeout(
                function(){
                    document.getElementById("clickUser").click();

                    setTimeout(
                        function(){
                            sequenceInd++;
                            eval(sequenceFunc[sequenceInd]);
                        }, 1000
                    );

                }, 2000
            );
            return false;

        }

    });

    /******2********/
}

function likeNext(){
    if ($(".coreSpriteRightPaginationArrow").length === 0) return false;
    $(".coreSpriteRightPaginationArrow").attr("id","nextme");
    document.getElementById("nextme").click();

    if ($(".glyphsSpriteHeart__outline__24__grey_9").length === 0){
        return true;
    } else {
        $(".glyphsSpriteHeart__outline__24__grey_9").parent().attr("id", "clickme");
        document.getElementById("clickme").click();
        return false;
    }
}

/*
* Not Dependent Function
* Used in:
 * userData.js
* */

function likeUserImages(){
    if ($(CLimage).length === 0){
        sequenceInd++;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $(CLimage).attr("id","openme");
    document.getElementById("openme").click();
    setTimeout(
        function () {
            var i = 0;
            var likedBefore = 0;
            var timerId = setInterval(function() {
                if (likeNext()) likedBefore++; else i++;
                if (i > 2 || likedBefore > 0){
                    clearInterval(timerId);
                    sequenceInd++;
                    eval(sequenceFunc[sequenceInd]);
                }
            }, 2000);

        }, 2000
    );
}

function prCloseOpenWindow()
{
    if ($(ClcloseBody).length === 0){
        sequenceInd = 0;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $(ClcloseBody).attr("id","prfollowingC");
    setTimeout(
        function(){
            document.getElementById("prfollowingC").click();
            sequenceInd = 0;
            eval(sequenceFunc[sequenceInd]);
        }, 600
    );
}

function prUsersOldGet() {

    if (localStorage["autoUsers"] != "" && localStorage["autoUsers"] != "undefined") {
        var prUsersOldR = JSON.parse(localStorage["autoUsers"]);

        for (prUser in prUsersOldR) {
            prUsersOld[prUser] = prUsersOldR[prUser];
        }
    }

}

var prUsersOld = [];
prUsersOldGet();



var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[0] = "prfollowOpen(\"2\",1000)";
sequenceFunc[1] = "followAndClickUser()";
sequenceFunc[2] = "likeUserImages()";
sequenceFunc[3] = "prCloseOpenWindow()";

eval( sequenceFunc[ sequenceInd ] );



















