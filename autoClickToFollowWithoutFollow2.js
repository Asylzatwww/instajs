/** Small functions, see the name description V2 **/

function getNumberOfFolowers(){
    var followers = $(".k9GMp").find("li:eq( 1 )").find("a").find("span").html();

    if (isNaN(parseInt(followers))) followers = $(".k9GMp").find("li:eq( 1 )").find("span").find("span").html();
    followers = followers.replace(" ", "");

    if (followers.indexOf("тыс.") > 0) followers = parseInt(followers) + "000";
    else if (followers.indexOf("млн") > 0) followers = parseInt(followers) + "000000";

    return parseInt(followers);
}

/**  --  **/


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


/*var i = 0;
var likedBefore = 0;
var timerId = setInterval(function() {
    if (likeNext()) likedBefore++; else i++;
}, 2000);
*/
/*
* Not Dependent Function
* Used in:
 * userData.js
* */

function likeUserImages(){
    if ($(".eLAPa").length === 0){
        sequenceInd++;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $(".eLAPa").attr("id","openme");
    document.getElementById("openme").click();
    setTimeout(
        function () {
            var i = 0;
            var likedBefore = 0;
            var timerId = setInterval(function() {
                if (likeNext()) likedBefore++; else i++;
                if (i > 0 || likedBefore > 0){
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
    console.log("finish");
    if ($(".ckWGn").length !== 0) window.history.back();
    window.history.back();
    setTimeout(function () {
            sequenceInd = 0;
            eval(sequenceFunc[sequenceInd]);
            },600);



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






function prUsersOldGet2() {

    if (localStorage["autoUsers2"] != "" && localStorage["autoUsers2"] != "undefined") {
        var prUsersOldR2 = JSON.parse(localStorage["autoUsers2"]);

        for (prUser2 in prUsersOldR2) {
            prUsersOld2[prUser2] = prUsersOldR2[prUser2];
        }
    }

}


var prUsersOld2 = [];
prUsersOldGet2();


function UpdateLocalStorage(){
    var prStr2 = "{";
    for (var prUser2 in prUsersOld2)
    {
        prStr2 += "\"" + prUser2 + "\" : \"" + prUsersOld2[prUser2] + "\",";
    }
    prStr2 = prStr2.slice(0, -1);
    prStr2 += "}";
    localStorage["autoUsers2"] = prStr2;
}

/** ------------------------------------------------------------------ **/


function findUser(){
    var iFound = false;
    $(".isgrP").attr("id","prfollowb");

    setTimeout(function () {
            document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());

            $("#prfollowb ul").find("li").each(function(){
                var prUserBtn = $(this).find(".L3NKy");
                var prUser = $(this).find("a");
                console.log(prUser);
                if ( ($(prUserBtn).length !== 0) && (!$(prUserBtn).hasClass("_8A5w5")) &&
                    (prUsersOld.indexOf( $(this).find("a").attr("href") ) < 0) &&  (prUsersOld2.indexOf( $(this).find("a").attr("href") ) < 0) ) {
                    iFound =true;
                    $(prUserBtn).attr("id","clickToFollow");
                    $(prUser).attr("id","clickUser");
                    prUsersOld2.push( $(this).find("a").attr("href") );
                    followAndClickUser();
                    console.log("i found");
                    return false;
                }
                else console.log("Ignored : " + $(this).find("a").attr("href"));
            });

            if (!iFound) findUser();

            },600);
}


function followAndClickUser(){
    /********2********/

            UpdateLocalStorage();

            setTimeout(function(){
                    document.getElementById("clickUser").click();

                    setTimeout(function(){
                            if (getNumberOfFolowers() < 1500) {
                                var prUserBtnD = $(".nZSzR").find("button");
                                $(prUserBtnD).attr("id","clickToFollowD");

                                setTimeout(function(){


                                        if ($("#clickToFollowD").length !== 0) document.getElementById("clickToFollowD").click();

                                        sequenceInd++;
                                        eval(sequenceFunc[sequenceInd]);


                                    }, 1000);
                            } else {
                                sequenceInd++;
                                eval(sequenceFunc[sequenceInd]);
                            }
                        }, 1000);

                }, 2000);

    /******2********/
}



var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[0] = "findUser()";
sequenceFunc[1] = "likeUserImages()";
sequenceFunc[2] = "prCloseOpenWindow()";

eval( sequenceFunc[ sequenceInd ] );












/*
function findUser(){
    var iFound = false;
    $(".isgrP").attr("id","prfollowb");

    setTimeout(function () {
        document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());

        $("#prfollowb ul").find("li").each(function(){
            var prUserBtn = $(this).find(".L3NKy");
            var prUser = $(this).find("a");
            console.log(prUser);
            if ( ($(prUserBtn).length !== 0) && (!$(prUserBtn).hasClass("_8A5w5"))
                //&& (prUsersOld.indexOf( $(this).find("a").attr("href") ) < 0) &&  (prUsersOld2.indexOf( $(this).find("a").attr("href") ) < 0)
            ) {
                iFound =true;
                $(prUserBtn).attr("id","clickToFollow");
                $(prUser).attr("id","clickUser");
                console.log( $(prUser).html() );
                //prUsersOld2.push( $(this).find("a").attr("href") );
                console.log("i found");
                return false;
            }
            else console.log("Ignored : " + $(this).find("a").attr("href"));
        });

        //if (!iFound) findUser();

    },600);
}

findUser();


*/
