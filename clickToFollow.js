
$(CLfolBodyUL).attr("id","prfollowb");
var prfollowbh = 0;
var i = 0;
var j = 0;


function clickToFollow(){
    setTimeout(
        function(){

            document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
            prfollowbh = $("#prfollowb ul").height();
            j = i;
            $(CLfolBodyUL).find("li").each(function(){
                var prUser = $(this).find("button._gexxb");
                if ($(prUser).length !== 0){
                    i++;
                    $(prUser).attr("id","click" + i);
                    console.log(prUser);
                }

            });

            var prClSelInt = setInterval(
                function(){

                    if ($("#click" + j).length === 0) console.log("click" + j);
                    else {
                        document.getElementById("click" + j).click();
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
