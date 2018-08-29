$('body').prepend("<div style='position: absolute;width: 500px;height: 500px;background: #baffa9;z-index: 10000;'>Statistics <br>autoCancelFollow<div class='autoCancelFollow'></div><br><div class='oldPrUser'></div></div>");

var interval =  setInterval(function(){
    var d = new Date();
    lastMin = parseInt(localStorage["aitoCancelFollow"]);
    var diffTime = d.getHours()*60 + d.getMinutes() - lastMin;
    $(".autoCancelFollow").html(lastMin + " " + diffTime);


}, 10000);


function prUsersOldGet2() {

    if (localStorage["autoUsers2"] != "" && localStorage["autoUsers2"] != "undefined") {
        var prUsersOldR2 = JSON.parse(localStorage["autoUsers2"]);

        for (prUser2 in prUsersOldR2) {
            prUsersOld2[prUser2] = prUsersOldR2[prUser2];
        }
    }

}

var oldPrUser = '';
var prUsersOld2 = [];

var interval2 = setInterval(function(){
    prUsersOldGet2();
    if (oldPrUser == prUsersOld2[ prUsersOld2.length - 1 ]) $(".oldPrUser").html("Script Not Running " + prUsersOld2[ prUsersOld2.length - 1 ] + " " + prUsersOld2.length);
    else $(".oldPrUser").html("script is Running " + prUsersOld2[ prUsersOld2.length - 1 ] + " " + prUsersOld2.length);
    oldPrUser = prUsersOld2[ prUsersOld2.length - 1 ];

}, 12000);








/***********************  download and store data  **********************/


var NNLibrary = [];
var NNLibraryImage = [];

$(".kPFhm").prepend("<div style='position: absolute;z-index: 1000;font-size: 30px;top: 30px;left: 30px;background: #87f9f9;height: 35px;' class='showIndex'></div>");

setInterval(function(){ $("._9AhH0").css({ display : "none" }) },600);


var image = $(".kPFhm").find("img").attr("src").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","");
var alt = $(".C4VMK span").first().text()
    .replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"")
    .replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","").replace("\n","");

if (localStorage["NNLibrary"] != "" && localStorage["NNLibrary"] != "undefined") {
    var NNLibraryR = JSON.parse(localStorage["NNLibrary"]);

    for (prUser in NNLibraryR) {
        NNLibrary[prUser] = NNLibraryR[prUser];
    }
}

if (localStorage["NNLibraryImage"] != "" && localStorage["NNLibraryImage"] != "undefined") {
    var NNLibraryImageR = JSON.parse(localStorage["NNLibraryImage"]);

    for (prUser in NNLibraryImageR) {
        NNLibraryImage[prUser] = NNLibraryImageR[prUser];
    }
}

if (NNLibraryImage.indexOf( image ) < 0) {


    var NNLibraryIndex =
        NNLibrary.push( alt )
        - 1;


    var NNLibraryImageIndex =
        NNLibraryImage.push( image )
        - 1;


    var prStr = "{";
    for (var prUser in NNLibrary)
    {
        prStr += "\"" + prUser + "\" : \"" + NNLibrary[prUser] + "\",";
    }
    prStr = prStr.slice(0, -1);
    prStr += "}";

    localStorage["NNLibrary"] = prStr;

    var prStr = "{";
    for (var prUser in NNLibraryImage)
    {
        prStr += "\"" + prUser + "\" : \"" + NNLibraryImage[prUser] + "\",";
    }
    prStr = prStr.slice(0, -1);
    prStr += "}";

    localStorage["NNLibraryImage"] = prStr;

    console.log(NNLibraryIndex + " " + NNLibraryImageIndex);
    console.log(NNLibrary[ NNLibraryIndex ]);
    console.log(NNLibraryImage[ NNLibraryImageIndex ]);

    $(".kPFhm .showIndex").html(NNLibraryIndex);
} else {
    console.log("not fine");
    $(".kPFhm .showIndex").html("not Fine");
}


/***************************  get data from library  **********************************/




function getNNLibrary(index){
    var tags = ["#НурланНасип", "#эстрада", "#бишкек", "#кыргызстан", "#ыр", "#видео", "#клип", "#нурлан", "#насип", "#аселькадырбекова", "#асел", "#кыргызча"];
    var NNLibrary = [];

    if (localStorage["NNLibrary"] != "" && localStorage["NNLibrary"] != "undefined") {
        var NNLibraryR = JSON.parse(localStorage["NNLibrary"]);

        for (prUser in NNLibraryR) {
            NNLibrary[prUser] = NNLibraryR[prUser];
        }
    }

    $(".NfvXc textarea").val( NNLibrary[ index ] + tags[ Math.floor(Math.random() * 11) ] + tags[ Math.floor(Math.random() * 11) ] + tags[ Math.floor(Math.random() * 11) ] );
    console.log(  NNLibrary[ index ] + tags[ Math.floor(Math.random() * 11) ] + tags[ Math.floor(Math.random() * 11) ] + tags[ Math.floor(Math.random() * 11) ] );
}

getNNLibrary(1);







