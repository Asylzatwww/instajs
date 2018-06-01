


function showUsersInfo() {
    $(CLfolBodyUL).find("li").each(function () {
        var prUser = $(this).find("a").attr("href");
        if (prUser in prUsersOld) {
            $(this).find("a")[0].after(" п-ки " + prUsersOld[prUser].followers + " (" + prUsersOld[prUser].following + ") публ " + prUsersOld[prUser].posted + " ");
            if (prUsersOld[prUser].followingMe == "0") $(this).css({border: "1px dashed red", margin: "2px 0"});

        }

    });
}

prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[1] = "showUsersInfo()";
prfollowOpen("2",1000);
