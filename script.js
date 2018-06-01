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
* Classes which can change
* */
var
    CLfolBodyUL = ".YHaCL", /* main page followers body->ul */
    ClcloseBody = "._2dDPU", /* main page followers close background */
    CLfollowLI = ".k9GMp", /* main page posts, followers, following */
    CLfolBody = ".j6cq2", /* main page followers body */
    CLheart = ".ptsdu", /* news heart open */
    CLimage = "._9AhH0", /* main page image */
    ClrightAr = "._1bdSS", /* main page Right Arrow */
    CLiconMain = "._7mese", /* main page icon */
    CLhomeIcon = ".kQqyt", /* main page home icon */
    CLbtnFollow = "button.jIbKX", /* button to follow */
    CLbtnUnFollow = "button.-fzfL" /* button to Unfollow */
    ;

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

    var linkForClick = $(CLfollowLI).find("li:eq( " + ind + " )").find("a");
    linkForClick.attr("id","prfollowing");
    setTimeout(
        function(){
            document.getElementById("prfollowing").click();
            linkForClick.removeAttr("id");

            setTimeout(
                function(){
                    $(CLfolBody).attr("id","prfollowb");
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
    if ($(ClcloseBody).length === 0){
        sequenceInd++;
        eval(sequenceFunc[sequenceInd]);
        return;
    }

    $(ClcloseBody).attr("id","prfollowingC");
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
    if ($(ClrightAr).length === 0) return false;
    $(ClrightAr).attr("id","nextme");
    document.getElementById("nextme").click();

    if ($(CLheart).length === 0){
        return true;
    } else {
        $(CLheart).parent().attr("id", "clickme");
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
                if (i > 1 || likedBefore > 0){
                    clearInterval(timerId);
                    sequenceInd++;
                    eval(sequenceFunc[sequenceInd]);
                }
            }, 2000);

        }, 2000
    );
}
