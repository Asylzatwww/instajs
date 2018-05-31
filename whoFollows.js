
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
                                eval(sequenceFunc[sequenceInd]);
                                sequenceInd--;

                                console.log(sequenceInd);

                                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                                prfollowbh = $("#prfollowb ul").height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                clearInterval(prfollowt);

                                sequenceInd++;
                                sequenceInd++;
                                console.log("i am running twice");
                                eval(sequenceFunc[sequenceInd]);

                            }
                        },1000
                    );




                }, time
            );
        }, 600
    );
}

function delUsersOld(){
    for (var prUser in prUsersOld)
    {
        if(jQuery.inArray(prUser, prUsers) == -1)
        {
            delete prUsersOld[prUser];
            console.log("Deleted - " + prUser);
        }
    }
}


function prUsersGet()
{

    $(CLfolBodyUL).find("li").each(function(){
        if ( $(this).attr("ind") =="selected" ) return true;

        var prUser = $(this).find("a").attr("href");
        i++;
        prUsers[i] = prUser;
        console.log(prUser);

        if(!(prUser in prUsersOld))
        {
            prUsersOld[prUser] = { "followers" : 0, "following" : 0, "posted" : 0, "date" : date, "followingMe" : 0 };
            console.log("Added - " + prUser);
        }

        $(this).attr("ind", "selected");
    });


}

function prFollowingMe()
{

    $(CLfolBodyUL).find("li").each(function(){
        prUser = $(this).find("a").attr("href");
        if(prUsersOld[prUser] != null)
        {
            console.log(prUser);
            prUsersOld[prUser].followingMe = 1;
        }
    });

}



prUsersOldGet();

var
    prUsers = [],

    i = 0,
    date = new Date();

date = (date.getMonth() + 1) + "/" + date.getDate() + "/" +  date.getFullYear();


var sequenceFunc = [],
    sequenceInd = 0;

prfollowOpen("2",1000);

sequenceFunc[1] = "prUsersGet()";
sequenceFunc[2] = "prCloseOpenWindow()";
sequenceFunc[3] = "prfollowOpen(\"1\",1000)";
sequenceFunc[4] = "prFollowingMe()";
sequenceFunc[5] = "delUsersOld()";



//Object.keys(prUsersOld).length