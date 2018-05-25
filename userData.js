
var prUsers = [];


function prUserData()
{
    var i = 0;

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
                        prUsersOld[ prUsers[j] ].followers = parseInt( $('._h9luf ').find('li:eq( 1 )').find('span').html().replace(',','').replace('тыс.','00') );
                        prUsersOld[ prUsers[j] ].following = parseInt( $('._h9luf ').find('li:eq( 2 )').find('span').html().replace(',','').replace('тыс.','00') );

                        console.log("User - " + prUsers[j] + "All - " + i + " Current - " + j);
                        console.log(prUsersOld[ prUsers[j] ]);
                        backFromUserPage(j,i);


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

///////////// inside someones page, with a timer


prUsersOldGet();
var sequenceFunc = [],
    sequenceInd = 0;

sequenceFunc[1] = "prUserData()";
prfollowOpen('2',1000);


function backFromUserPage(j,i) {

    $('.coreSpriteDesktopNavProfile').attr("id", "desktopNavProf");
    setTimeout(
        function () {
            document.getElementById('desktopNavProf').click();

            setTimeout(
                function () {

                    $('._h9luf ').find('li:eq( 2 )').find('a').attr("id", "prfollowing");
                    setTimeout(
                        function () {
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

}









