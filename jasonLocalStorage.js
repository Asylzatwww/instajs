
writeToLocalStorage();
function writeToLocalStorage()
{
    var prStr = '{';
    for (prUser in prUsersOld)
    {
        prStr += '&r"' + prUser + '&r" : { &r"followers&r" : ' + prUsersOld[prUser].followers + ', &r"following&r" : ' + prUsersOld[prUser].following + ', &r"posted&r" : ' +
            prUsersOld[prUser].posted + ', &r"date&r" : &r"' + prUsersOld[prUser].date + '&r", &r"followingMe&r" : &r"' + prUsersOld[prUser].followingMe + '&r" },';
    }
    prStr = prStr.slice(0, -1);
    prStr += '}';
    console.log(prStr);
    localStorage['instagramUsers'] = prStr;
}

/**********       null the local storage    ******************/

localStorage['instagramUsers'] = '';

/********************/
