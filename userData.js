
var prUsers = [];
var allUsers = 0;
var currentUser = 0;


function prUserData()
{

    $("._gs38e").find("li").each(function(){

        prUsers[allUsers] = $(this).find("a").attr("href");
        $(this).find("a").attr("id",  prUsers[allUsers] );
        allUsers++;

    });

    prUserDataCycleInd( prUsers);

}

function prUserDataCycleInd( prUsers)
{

    if (prUsersOld[ prUsers[currentUser] ] != null && prUsersOld[ prUsers[currentUser] ].followers == 0){

        setTimeout(
            function(){
                document.getElementById( prUsers[currentUser] ).click();

                setTimeout(
                    function(){
                        prUsersOld[ prUsers[currentUser] ].followers = parseInt( $("._h9luf ").find("li:eq( 1 )").find("span").html().replace(",","").replace("тыс.","00") );
                        prUsersOld[ prUsers[currentUser] ].following = parseInt( $("._h9luf ").find("li:eq( 2 )").find("span").html().replace(",","").replace("тыс.","00") );

                        console.log("User - " + prUsers[currentUser] + "All - " + allUsers + " Current - " + currentUser);
                        console.log(prUsersOld[ prUsers[currentUser] ]);

                        sequenceInd = 2;
                        eval(sequenceFunc[sequenceInd]);


                    }, 1000
                );

            }, 600
        );

    }
    else
    {
        console.log( prUsers[currentUser] );
        currentUser++;
        if (currentUser < allUsers) eval("prUserDataCycleInd(prUsers)");
    }
}


function backFromUserPage() {
    setTimeout(
        function () {
            $(".coreSpriteDesktopNavProfile").attr("id", "desktopNavProf");
            setTimeout(
                function () {
                    document.getElementById("desktopNavProf").click();

                    setTimeout(
                        function () {

                            $("._h9luf ").find("li:eq( 2 )").find("a").attr("id", "prfollowing");
                            setTimeout(
                                function () {
                                    document.getElementById("prfollowing").click();

                                    setTimeout(
                                        function(){

                                            $("._gs38e").find("li").each(function(){

                                                $(this).find("a").attr("id",  $(this).find("a").attr("href") );

                                            });


                                            currentUser++;
                                            if (currentUser < allUsers) eval("prUserDataCycleInd(prUsers)");

                                        }, 600
                                    );

                                }, 600
                            );


                        }, 600
                    );

                }, 600
            );
        }, 600
    );

}


prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[1] = "prUserData()";
sequenceFunc[2] = "likeUserImages()";
sequenceFunc[3] = "prCloseOpenWindow()";
sequenceFunc[4] = "backFromUserPage()";

prfollowOpen("2",1000);

