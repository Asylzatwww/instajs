function clickToFollow(){
    $("._gs38e").attr("id","prfollowb");
    var prfollowbh = 0;
    var i = 0;

    var prfollowt = setInterval(
        function(){
            if (prfollowbh != $("#prfollowb ul").height() && i < 12)
            {
                document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
                prfollowbh = $("#prfollowb ul").height();

                $("._gs38e").find("li").each(function(){
                    var prUser = $(this).find("button._gexxb");
                    if ($(prUser).length !== 0){
                        i++;
                        $(prUser).attr("id","click" + i)
                    }
                    console.log(prUser);

                });

                console.log(prfollowbh);
            }
            else
            {
                clearInterval(prfollowt);
                for (var j = 1; j < i; j++){
                    document.getElementById("click" + j).click();
                }
            }
        },600
    );
}

clickToFollow();
