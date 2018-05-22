var InstaGram = {

    prUsersOld : [],

    prUsersOldGet : function()
    {
        if (localStorage['instagramUsers'] != '')
        {
            var prUsersOldR = JSON.parse(localStorage['instagramUsers']);

            for (prUser in prUsersOldR){
                this.prUsersOld[prUser] = prUsersOldR[prUser];
            }
        }

    },


    prfollowOpen : function (ind, time, timeSequence)
    {
        this.prUsersOldGet();

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
                                    eval(timeSequence);
                                }
                            },600
                        );
                    }, time
                );
            }, 600
        );
    },

    prCloseByBack : function(timeSequence)
    {
        $('._pfyik ').attr("id","prfollowingC");
        setTimeout(
            function(){
                document.getElementById('prfollowingC').click();
                eval(timeSequence);
            }, 600
        );
    },

    prUsersGet : function(timeSequence)
    {
        var
            that = this,
            prUsers = [],
            i = 0,
            date = new Date();

        date += '';
        date.substring(0, date.indexOf('GMT')-1);

        $('._gs38e').find('li').each(function(){
            prUser = $(this).find('a').attr('href');
            if(jQuery.inArray(prUser, that.prUsersOld) == -1)
            {
                i++;
                prUsers[i] = prUser;
                that.prUsersOld[prUser] = { 'followers' : 0, 'following' : 0, 'posted' : 0, 'date' : date, 'followingMe' : 0 };
            }
            console.log(prUser);
        });

        i = 0;
        for (prUser in this.prUsersOld)
        {
            if(jQuery.inArray(prUser, prUsers) == -1)
            {
                this.prUsersOld = this.prUsersOld.slice(i,1);
            }
            i++;
        }

        this.prCloseByBack(timeSequence);

    },

    prFollowingMe : function()
    {
        var that = this;
        $('._gs38e').find('li').each(function(){
            prUser = $(this).find('a').attr('href');
            if(that.prUsersOld[prUser] != null)
            {
                console.log(prUser);
                that.prUsersOld[prUser].followingMe = 1;
            }
        });


    },

    writeToLocalStorage : function()
    {
        var prStr = '{';
        for (prUser in this.prUsersOld)
        {
            prStr += '"' + prUser + '" : { "followers" : ' + this.prUsersOld[prUser].followers + ', "following" : ' + this.prUsersOld[prUser].following + ', "posted" : ' +
                this.prUsersOld[prUser].posted + ', "date" : "' + this.prUsersOld[prUser].date + '", "followingMe" : "' + this.prUsersOld[prUser].followingMe + '" },';
        }
        prStr = prStr.slice(0, -1);
        prStr += '}';
        console.log(prStr);
        localStorage['instagramUsers'] = prStr;
    },

    likesOnMainPage : function()
    {

        var that = this;

        $('.coreSpriteDesktopNavLogoAndWordmark').attr("id","desktopNav");

        setTimeout(
            function(){
                document.getElementById('desktopNav').click();

                setTimeout(
                    function(){

                        var i = 0;
                        that.prUsersOldGet();

                        var timerId = setInterval(function() {

                            $('.coreSpriteHeartOpen').parent().attr("id","prHeart");

                            if ( ($('#prHeart').offset() == null) || (i > 10) )
                            {
                                clearInterval(timerId);
                                that.writeToLocalStorage();
                            }

                            $(window).scrollTop(  $('#prHeart').offset().top );

                            that.prUsersOld[ $('.coreSpriteHeartOpen').parent().parent().parent().parent().find('header').find('a').attr('href') ].posted++;
                            document.getElementById('prHeart').click();

                            $('#prHeart').removeAttr("id");

                            i++;
                        }, 600);

                    }, 600
                );

            }, 600
        );

    },


    userData : function()
    {
        var i = 0, prUsers = [];

        $('._gs38e').find('li').each(function(){

            prUsers[i] = $(this).find('a').attr('href');
            $(this).find('a').attr('id',  prUsers[i] );
            i++;

        });

        this.prUsersOldGet();

        this.userDataCycleInd( prUsers, 0 , i);


    },

    userDataCycleInd : function( prUsers, j , i)
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






}



var instaGram = InstaGram;

var i = 0;



















/*************************************************************/
/// 1
/// Get all Users
/*************************************************************/


instaGram.prfollowOpen(
    '2',1000, "instaGram.prUsersGet( \"instaGram.prfollowOpen('1',1000, \'instaGram.prFollowingMe()\' )\"	)"
);

/*************************************************************/
/// write to local Storage
instaGram.writeToLocalStorage();

/*************************************************************/
/// end
/*************************************************************/










/*************************************************************/
/// 2
/// Likes on main page
/*************************************************************/


instaGram.likesOnMainPage();

/*************************************************************/
/// end
/*************************************************************/








///////////// inside someones page, with a timer



instaGram.prfollowOpen(
    '2',1000, 'instaGram.userData()'
);



///////////////////////////////

instaGram.prfollowOpen(
    '2',1000, null
);




instaGram.prUsersOldGet();


$('._gs38e').find('li').each(function(){
    prUser = $(this).find('a').attr('href');
    if(jQuery.inArray(prUser, instaGram.prUsersOld) == -1)
    {
        $(this).find('a')[0].after(' п-ки ' + instaGram.prUsersOld[ prUser ].followers + ' (' + instaGram.prUsersOld[ prUser ].following + ') публ ' + instaGram.prUsersOld[ prUser ].posted + ' ');
        if (instaGram.prUsersOld[ prUser ].followingMe == '0') $(this).css({ border : "1px dashed red", margin : "2px 0" });

    }

});




