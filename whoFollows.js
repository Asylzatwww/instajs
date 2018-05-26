


function prUsersGet()
{
    var
        prUsers = [],
        i = 0,
        date = new Date();
    date = (date.getMonth() + 1) + "/" + date.getDate() + "/" +  date.getFullYear();

    $("._gs38e").find("li").each(function(){
        prUser = $(this).find("a").attr("href");
        i++;
        prUsers[i] = prUser;

        if(!(prUser in prUsersOld))
        {
            prUsersOld[prUser] = { "followers" : 0, "following" : 0, "posted" : 0, "date" : date, "followingMe" : 0 };
            console.log("Added - " + prUser);
        }
    });

    for (prUser in prUsersOld)
    {
        if(jQuery.inArray(prUser, prUsers) == -1)
        {
            delete prUsersOld[prUser];
            console.log("Deleted - " + prUser);
        }
    }

    sequenceInd++;
    eval(sequenceFunc[sequenceInd]);

}

function prCloseOpenWindow()
{
    $("._pfyik ").attr("id","prfollowingC");
    setTimeout(
        function(){
            document.getElementById("prfollowingC").click();
            sequenceInd++;
            eval(sequenceFunc[sequenceInd]);
        }, 600
    );
}

function prFollowingMe()
{
    var that = this;
    $("._gs38e").find("li").each(function(){
        prUser = $(this).find("a").attr("href");
        if(prUsersOld[prUser] != null)
        {
            console.log(prUser);
            prUsersOld[prUser].followingMe = 1;
        }
    });


}





prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;
prfollowOpen("2",1000);
sequenceFunc[1] = "prUsersGet()";
sequenceFunc[2] = "prCloseOpenWindow()";
sequenceFunc[3] = "prfollowOpen(\"1\",1000)";
sequenceFunc[4] = "prFollowingMe()";





