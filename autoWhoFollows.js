function prfollowOpen(ind, time)
{

            setTimeout(
                function(){
                    $(".isgrP").attr("id","prfollowb");
                    var prfollowbh = 0;



                    var prfollowt = setInterval(
                        function(){
                            if (prfollowbh != $("#prfollowb ul").height())
                            {
                                $("#prfollowb ul").find("li").each(function(){
                                    console.log( $(this).find("a").attr("href") );

                                    if (prUsers.indexOf( $(this).find("a").attr("href") ) < 0)
                                        prUsers.push( $(this).find("a").attr("href") );

                                });

                                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                                prfollowbh = $("#prfollowb ul").height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                clearInterval(prfollowt);


                            }
                        },1000
                    );




                }, time
            );

}

var prUsers = [];
prfollowOpen(1,1000);







var prStr = "{";
for (var prUser in prUsers)
{
    prStr += "\"" + prUser + "\" : \"" + prUsers[prUser] + "\",";
}
prStr = prStr.slice(0, -1);
prStr += "}";
console.log(prStr);
localStorage["autoUsers"] = prStr;



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


