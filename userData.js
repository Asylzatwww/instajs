
var prUserNotFound = false;
var currentUser = 0;
var prUserIndex;

prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[0] = "prfollowOpen(\"2\",1000);";
sequenceFunc[1] = "lookForUser(prfollowt)";
sequenceFunc[2] = "prUserDataCycleInd()";
sequenceFunc[3] = "likeUserImages()";
sequenceFunc[4] = "prCloseOpenWindow()";
sequenceFunc[5] = "backFromUserPage()";

eval( sequenceFunc[ sequenceInd ] );

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
                                sequenceInd++;
                                if ( eval(sequenceFunc[sequenceInd]) ) return false;
                                sequenceInd--;

                                console.log(sequenceInd);

                                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                                prfollowbh = $("#prfollowb ul").height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                prUserNotFound = true;
                                clearInterval(prfollowt);

                            }
                        },1000
                    );




                }, time
            );
        }, 600
    );
}


function lookForUser(prfollowt){
    $(CLfolBodyUL).find("li").each(function(){

        currentUser = $(this).find("a").attr("href");

        if (currentUser in prUsersOld && prUsersOld[ currentUser ].followers == 0 ){
            $(this).find("a").attr("id",  currentUser );
            clearInterval(prfollowt);
            return false;
        } else currentUser = "";

    });

    if (currentUser != ""){
        sequenceInd++;
        console.log("i am running twice");
        eval(sequenceFunc[sequenceInd]);

        return true;
    }

}

function prUserDataCycleInd()
{
    if (currentUser == "") return false;

    setTimeout(
        function(){
            document.getElementById( currentUser ).click();

            setTimeout(
                function(){
                    prUsersOld[ currentUser ].followers = parseInt( $(CLfollowLI).find("li:eq( 1 )").find("span").html().replace(" ","").replace(",","").replace("тыс.","00") );
                    prUsersOld[ currentUser ].following = parseInt( $(CLfollowLI).find("li:eq( 2 )").find("span").html().replace(" ","").replace(",","").replace("тыс.","00") );

                    prUserIndex++;
                    console.log("User - " + currentUser + " Index - " + prUserIndex);
                    console.log(prUsersOld[ currentUser ]);

                    sequenceInd++;
                    eval(sequenceFunc[sequenceInd]);


                }, 1000
            );

        }, 600
    );

}

function backFromUserPage() {
    setTimeout(
        function () {
            $(CLhomeIcon).attr("id", "desktopNavProf");
            setTimeout(
                function () {
                    document.getElementById("desktopNavProf").click();

                    setTimeout(
                        function () {

                            if (!prUserNotFound) {
                                sequenceInd = 0;
                                eval( sequenceFunc[ sequenceInd ] );
                            }

                        }, 600
                    );

                }, 600
            );
        }, 600
    );

}










