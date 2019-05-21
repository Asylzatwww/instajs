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
                                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                                prfollowbh = $("#prfollowb ul").height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                clearInterval(prfollowt);
                                cancelFollowStart();

                             }
                        },2000
                    );




                }, time
            );
}

var autoIndex = 0;
prfollowOpen(2, 1000);



function cancelFollowStart(){
    var cancelFollow = $("#prfollowb").find("._8A5w5").last();
    $(cancelFollow).attr("id","prCancelFollow");

    setTimeout(
        function() {
            document.getElementById("prCancelFollow").click();
            /******2******/
            setTimeout(
                function() {
                    $(".aOOlW.-Cab_").attr("id","prCancelFollow2");

                    /******3******/
                    setTimeout(
                        function() {
                            document.getElementById("prCancelFollow2").click();
                            autoIndex++;
                            console.log(autoIndex);

                            /******4******/
                            setTimeout(
                                function() {
                                    $(cancelFollow).removeAttr("id","prCancelFollow");
                                    IamStillRunningCheck();
                                    cancelFollowStart();
                                }, 5000
                            );
                            /******4*****/


                        }, 30000
                    );
                    /******3*****/

                }, 5000
            );
            /******2*****/

        }, 3000
    );
}


function IamStillRunningCheck(){
    var d = new Date();
    localStorage["aitoCancelFollow"] = d.getHours()*60 + d.getMinutes();
}





