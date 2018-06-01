
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

                    scrollDown();

                }, time
            );
        }, 600
    );
}

function scrollDown(){

    setTimeout(
        function(){
            if (prfollowbh == $("#prfollowb ul").height()) return false;

            sequenceInd++;
            eval(sequenceFunc[sequenceInd]);

            document.getElementById("prfollowb").scrollTo(0,$("#prfollowb ul").height());
            prfollowbh = $("#prfollowb ul").height();
            console.log(prfollowbh);

        }, 1000
    );

}

function lookForUser(prfollowt){
    prUserIndex = 0;
    prUserIndex2 = 0;
    prUsers = [];

    $(CLfolBodyUL).find("li").each(function(){

        currentUser = $(this).find("a").attr("href");
        console.log("Tracking user + " + currentUser + " date - " + ((prUsersOld[ currentUser ] != null) ? prUsersOld[ currentUser ].date : " - ") + " sort -  " + prUsersSort.indexOf( currentUser ) );

        if (prUsersSort.indexOf( currentUser ) > -1) {
            $(this).find(CLbtnUnFollow).attr("id",  currentUser );
            prUserIndex++;
            prUsers[ prUserIndex ] = currentUser;
            console.log("Add to array - " + currentUser + " Index - " + prUserIndex);
        }

    });
    if (prUserIndex == 0) {
        sequenceInd = 0;
        eval(sequenceFunc[sequenceInd]);
        return false;
    }

    var prfollowt = setInterval(
        function(){
            prUserIndex2++;
            document.getElementById( prUsers[ prUserIndex2 ] ).click();
            console.log("Deleted - " + prUsersOld[ prUsers[ prUserIndex2 ] ]);
            delete prUsersSort[ prUsersSort.indexOf( prUsers[ prUserIndex2 ] ) ];
            delete prUsersOld[ prUsers[ prUserIndex2 ] ];
            if (prUserIndex2 >= prUserIndex) {
                clearInterval(prfollowt);
                sequenceInd = 0;
                eval(sequenceFunc[sequenceInd]);
            }

        },1000
    );

}



var prUsersSort = [];
var dates = [];
var minDate = "";

function min_date(all_dates) {
    var min_dt = all_dates[0],
        min_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function(dt, index)
    {
        if ( new Date( dt ) < min_dtObj)
        {
            min_dt = dt;
            min_dtObj = new Date(dt);
        }
    });
    return min_dt;
}

function prUsersSortF(){
    var index = 0;
    var prUsersSort2 = [];
    for (var prUser in prUsersOld){
        if (prUsersOld[ prUser ].date in prUsersSort2)
            prUsersSort2[ prUsersOld[ prUser ].date ].push( prUser );
        else
        {
            prUsersSort2[ prUsersOld[ prUser ].date ] = [];
            dates.push( prUsersOld[ prUser ].date );
        }
    }

    minDate = min_date( dates );

    for (var prUser in prUsersSort2[ minDate ]){
        prUsersSort[index] = prUsersSort2[ minDate ][prUser];
        index++;
        if (index > 9) return false;
    }

}


var currentUser = 0;
var prfollowbh = 0;
var prUserIndex = 0;
var prUserIndex2 = 0;
var prUsers = [];

prUsersOldGet();
prUsersSortF();


var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[0] = "scrollDown()";
sequenceFunc[1] = "lookForUser()";

prfollowOpen("2",1000);




