/*
* Global
*/

/*
* Used in:
 * whoFollows.js
 * jasonLocalStorage.js
* */
var prUsersOld = [];


/*
* Not Dependent Function
* Used in:
 * whoFollows.js
* */
function prUsersOldGet()
{
    if (localStorage['instagramUsers'] != '' && localStorage['instagramUsers'] == 'undefined')
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




















function prUserData()
{
    var i = 0, prUsers = [];

    $('._gs38e').find('li').each(function(){

        prUsers[i] = $(this).find('a').attr('href');
        $(this).find('a').attr('id',  prUsers[i] );
        i++;

    });

    prUserDataCycleInd( prUsers, 0 , i);

}

function prUserDataCycleInd( prUsers, j , i)
{

    if (prUsersOld[ prUsers[j] ] != null && prUsersOld[ prUsers[j] ].followers == 0){

        setTimeout(
            function(){
                document.getElementById( prUsers[j] ).click();

                setTimeout(
                    function(){
                        prUsersOld[ prUsers[j] ].followers = parseInt( $('._h9luf ').find('li:eq( 1 )').find('span').html() );
                        prUsersOld[ prUsers[j] ].following = parseInt( $('._h9luf ').find('li:eq( 2 )').find('span').html() );

                        console.log(prUsersOld[ prUsers[j] ]);
                        console.log(prUsersOld[ prUsers[j] ].followers);



                    }, 1000
                );

            }, 600
        );

    }
    else
    {
        j++;
        console.log( prUsers[j] );
        if (j < i) eval('prUserDataCycleInd(prUsers, j, i)');
    }
}




$('.coreSpriteDesktopNavProfile').attr("id","desktopNavProf");
setTimeout(
    function(){
        document.getElementById('desktopNavProf').click();

        setTimeout(
            function(){

                $('._h9luf ').find('li:eq( 2 )').find('a').attr("id","prfollowing");
                setTimeout(
                    function(){
                        document.getElementById('prfollowing').click();

                        setTimeout(
                            function(){

                                $('._gs38e').find('li').each(function(){

                                    $(this).find('a').attr('id',  $(this).find('a').attr('href') );

                                });

                                setTimeout(
                                    function(){
                                        j++;
                                        if (j < i) eval('prUserDataCycleInd(prUsers, j, i)');
                                    }, 600
                                );
                            }, 600
                        );

                    }, 600
                );


            }, 600
        );

    }, 600
);











///////////// inside someones page, with a timer


prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[1] = "prUserData()";
prfollowOpen('2',1000);



///////////////////////////////

prfollowOpen(
    '2',1000, null
);




prUsersOldGet();


$('._gs38e').find('li').each(function(){
    prUser = $(this).find('a').attr('href');
    if(jQuery.inArray(prUser, prUsersOld) == -1)
    {
        $(this).find('a')[0].after(' п-ки ' + prUsersOld[ prUser ].followers + ' (' + prUsersOld[ prUser ].following + ') публ ' + prUsersOld[ prUser ].posted + ' ');
        if (prUsersOld[ prUser ].followingMe == '0') $(this).css({ border : "1px dashed red", margin : "2px 0" });

    }

});




