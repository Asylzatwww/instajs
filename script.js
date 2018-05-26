/*
* Global
*/

/*
* Used in:
 * whoFollows.js
 * jasonLocalStorage.js
 * userData.js
 * showUsersInfo.js
* */
var prUsersOld = [];


/*
* Not Dependent Function
* Used in:
 * whoFollows.js
 * userData.js
 * showUsersInfo.js
* */
function prUsersOldGet()
{
    if (localStorage["instagramUsers"] != "" && localStorage["instagramUsers"] != "undefined")
    {
        var prUsersOldR = JSON.parse(localStorage["instagramUsers"]);

        for (prUser in prUsersOldR){
            prUsersOld[prUser] = prUsersOldR[prUser];
        }
    }

}

/*
* Not Dependent Function
* Used in:
 * whoFollows.js
 * userData.js
 * showUsersInfo.js
* */
function prfollowOpen(ind, time)
{

    var linkForClick = $("._h9luf ").find("li:eq( " + ind + " )").find("a");
    linkForClick.attr("id","prfollowing");
    setTimeout(
        function(){
            document.getElementById("prfollowing").click();
            linkForClick.removeAttr("id");

            setTimeout(
                function(){
                    $("._gs38e").attr("id","prfollowb");
                    var prfollowbh = 0;
                    var prfollowt = setInterval(
                        function(){
                            if (prfollowbh != $("#prfollowb ul").height())
                            {
                                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                                prfollowbh = $("#prfollowb ul").height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                clearInterval(prfollowt);
                                sequenceInd++;
                                eval(sequenceFunc[sequenceInd]);

                            }
                        },600
                    );
                }, time
            );
        }, 600
    );
}

/*
* Not Dependent Function
* Used in:
 * whoFollows.js
 * userData.js
* */

function prCloseOpenWindow()
{
    if ($("._pfyik").length === 0){
        sequenceInd++;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $("._pfyik ").attr("id","prfollowingC");
    setTimeout(
        function(){
            document.getElementById("prfollowingC").click();
            sequenceInd++;
            eval(sequenceFunc[sequenceInd]);
        }, 600
    );
}

/*
* Not Dependent Function
* Used in:
 * userData.js
* */

function likeNext(){
    if ($(".coreSpriteRightPaginationArrow").length === 0) return false;
    $(".coreSpriteRightPaginationArrow").attr("id","nextme");
    document.getElementById("nextme").click();

    if ($(".coreSpriteHeartOpen").length === 0){
        return true;
    } else {
        $(".coreSpriteHeartOpen").parent().attr("id", "clickme");
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
    if ($("._e3il2").length === 0){
        sequenceInd++;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $("._e3il2").attr("id","openme");
    document.getElementById("openme").click();
    setTimeout(
        function () {
            var i = 0;
            var likedBefore = 0;
            var timerId = setInterval(function() {
                if (likeNext()) likedBefore++; else i++;
                if (i > 3 || likedBefore > 0){
                    clearInterval(timerId);
                    sequenceInd++;
                    eval(sequenceFunc[sequenceInd]);
                }
            }, 2000);

        }, 2000
    );
}
