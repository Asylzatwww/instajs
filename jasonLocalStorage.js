
writeToLocalStorage();
function writeToLocalStorage()
{
    var prStr = '{';
    for (prUser in prUsersOld)
    {
        prStr += '"' + prUser + '" : { "followers" : ' + prUsersOld[prUser].followers + ', "following" : ' + prUsersOld[prUser].following + ', "posted" : ' +
            prUsersOld[prUser].posted + ', "date" : "' + prUsersOld[prUser].date + '", "followingMe" : "' + prUsersOld[prUser].followingMe + '" },';
    }
    prStr = prStr.slice(0, -1);
    prStr += '}';
    console.log(prStr);
    localStorage['instagramUsers'] = prStr;
}


