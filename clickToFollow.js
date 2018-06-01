
$(CLfolBodyUL).attr("id","prfollowb");
var prfollowbh = 0;
var i = 0;
var j = 0;
var uniqStr = Math.floor(Math.random() * 100);


function clickToFollow(){
    setTimeout(
        function(){

            document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
            prfollowbh = $("#prfollowb ul").height();
            j = i;
            $(CLfolBodyUL).find("li").each(function(){
                var prUser = $(this).find(CLbtnFollow);
                if ($(prUser).length !== 0){
                    i++;
                    $(prUser).attr("id","click" + uniqStr + i);
                    console.log(prUser);
                }

            });

            var prClSelInt = setInterval(
                function(){

                    if ($("#click" + uniqStr + j).length === 0) console.log("click" + j);
                    else {
                        document.getElementById("click" + uniqStr + j).click();
                        console.log("following - " + j);
                    }

                    if (j >= i) {
                        clearInterval(prClSelInt);
                        if (prfollowbh != $("#prfollowb ul").height() && i < 10) eval("clickToFollow()");
                    }
                    j++;

                },1000
            );

            console.log(prfollowbh);

        }, 600
    );

}



clickToFollow();
