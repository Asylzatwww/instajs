/*
* Global
*/

/*
* Used in:
 * whoFollows.js
 * jasonLocalStorage.js
 * userData.js
* */
var prUsersOld = [];


/*
* Not Dependent Function
* Used in:
 * whoFollows.js
 * userData.js
* */
function prUsersOldGet()
{
    if (localStorage['instagramUsers'] != '' && localStorage['instagramUsers'] != 'undefined')
    {
        var prUsersOldR = JSON.parse(localStorage['instagramUsers']);

        for (prUser in prUsersOldR){
            prUsersOld[prUser] = prUsersOldR[prUser];
        }
    }

}

/*
* Not Dependent Function
* Used in:
 * whoFollows.js
 * userData.js
* */
function prfollowOpen(ind, time)
{

    $('._h9luf ').find('li:eq( ' + ind + ' )').find('a').attr("id","prfollowing");
    setTimeout(
        function(){
            document.getElementById('prfollowing').click();

            setTimeout(
                function(){
                    $('._gs38e').attr("id","prfollowb");
                    var prfollowbh = 0;
                    var prfollowt = setInterval(
                        function(){
                            if (prfollowbh != $('#prfollowb ul').height())
                            {
                                document.getElementById('prfollowb').scrollTo(0,$('#prfollowb ul').height());
                                prfollowbh = $('#prfollowb ul').height();
                                console.log(prfollowbh);
                            }
                            else
                            {
                                clearInterval(prfollowt);
                                sequenceInd++;
                                eval(sequenceFunc[sequenceInd]);
                            }
                        },600
                    );
                }, time
            );
        }, 600
    );
}















