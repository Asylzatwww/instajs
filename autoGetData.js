//window.location.href

//"https://www.instagram.com/p/BlAQs8dHEf1/?taken-by=mashiny_na_prodaju"

var mashiny_na_prodaju


function writeToLocalStorage()
{
    var prStr = "{";
    for (prUser in prUsersOld)
    {
        prStr += "\"link\" : { \"followers\" : " + prUsersOld[prUser].followers + ", \"following\" : " + prUsersOld[prUser].following + ", \"posted\" : " +
            prUsersOld[prUser].posted + ", \"date\" : \"" + prUsersOld[prUser].date + "\", \"followingMe\" : \"" + prUsersOld[prUser].followingMe + "\" },";
    }
    prStr = prStr.slice(0, -1);
    prStr += "}";
    console.log(prStr);
    localStorage["mashiny_na_prodaju"] = prStr;
}

writeToLocalStorage();


























function prUsersOldGet2() {

    if (localStorage["autoUsers2"] != "" && localStorage["autoUsers2"] != "undefined") {
        var prUsersOldR2 = JSON.parse(localStorage["autoUsers2"]);

        for (prUser2 in prUsersOldR2) {
            prUsersOld2[prUser2] = prUsersOldR2[prUser2];
        }
    }

}

var prUsersOld2 = [];
prUsersOldGet2();
console.log( prUsersOld2.length);


