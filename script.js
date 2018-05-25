/*
* Global Used in:
 * whoFollows.js
 * jasonLocalStorage.js
* */
var prUsersOld = [];





















function userData()
{
    var i = 0, prUsers = [];

    $('._gs38e').find('li').each(function(){

        prUsers[i] = $(this).find('a').attr('href');
        $(this).find('a').attr('id',  prUsers[i] );
        i++;

    });

    this.prUsersOldGet();

    this.userDataCycleInd( prUsers, 0 , i);


}

function userDataCycleInd( prUsers, j , i)
{
    var that = this;

    if (this.prUsersOld[ prUsers[j] ] != null && this.prUsersOld[ prUsers[j] ].followers == 0){

        setTimeout(
            function(){
                document.getElementById( prUsers[j] ).click();

                setTimeout(
                    function(){
                        that.prUsersOld[ prUsers[j] ].followers = parseInt( $('._h9luf ').find('li:eq( 1 )').find('span').html() );
                        that.prUsersOld[ prUsers[j] ].following = parseInt( $('._h9luf ').find('li:eq( 2 )').find('span').html() );

                        console.log(that.prUsersOld[ prUsers[j] ]);
                        console.log(that.prUsersOld[ prUsers[j] ].followers);

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
                                                                if (j < i) eval('instaGram.userDataCycleInd(prUsers, j, i)');
                                                                else that.writeToLocalStorage();
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

                    }, 1000
                );

            }, 600
        );

    }
    else
    {
        j++;
        console.log( prUsers[j] );

        if (j < i) eval('instaGram.userDataCycleInd(prUsers, j, i)');
        else that.writeToLocalStorage();
    }
}









































///////////// inside someones page, with a timer



prfollowOpen(
    '2',1000, 'userData()'
);



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




