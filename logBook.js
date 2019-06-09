

var moveHistory = [];

var moveHistoryStr = "var moveHistory = [];";

var dataClass;
if ($('#eld-ev-s-text-content')[0]) dataClass = $('#eld-ev-s-text-content > tr');
else dataClass = $('#eld-ev-o-text-content  > tr');

var count = $( dataClass ).length;
// $('#eld-ev-o-text-content  > tr').find('td:nth-child(2)').text().trim();
$( dataClass ).each(function(i) {

    /*console.log( $(this).find('td:nth-child(1)').text().trim() );
    console.log( $(this).find('td:nth-child(2)').text().trim() );
    console.log( $(this).find('td:nth-child(3)').text().trim() );
    console.log( $(this).find('td:nth-child(4)').text().trim() );
    console.log( $(this).find('td:nth-child(5)').text().trim() );

    console.log( $(this).find('td:nth-child(5)').text().trim().slice( ($(this).find('td:nth-child(5)').text().trim().indexOf(' of ') ) + 4) );

    console.log( $(this).find('td:nth-child(8)').text().trim() );*/

    var ind = $(this).find('td:nth-child(1)').text().trim();
    var loc = $(this).find('td:nth-child(5)').text().trim();
    var timeStart = $(this).find('td:nth-child(3)').text().trim();
    var status = $(this).find('td:nth-child(2)').text().trim();
    var notes = $(this).find('td:nth-child(8)').text().trim();

    if (notes == '') notes = " ";
    moveHistory[ ind ] = [];

    moveHistory[ ind ]['loc'] = loc;
    moveHistory[ ind ]['timeStart'] = timeStart;
    moveHistory[ ind ]['status'] = status;

    moveHistoryStr += "moveHistory[" + ind + "] = [];";

    moveHistoryStr += "moveHistory[" + ind + "]['loc'] = '" + loc + "';";
    moveHistoryStr += "moveHistory[" + ind + "]['timeStart'] = '" + timeStart + "';";
    moveHistoryStr += "moveHistory[" + ind + "]['status'] = '" + status + "';";
    moveHistoryStr += "moveHistory[" + ind + "]['notes'] = '" + notes + "';";
    var statusBtn = '';
    switch (status) {
        case 'Off Duty' : statusBtn = 'edit-event-set-off-duty';break;
        case 'SB' : statusBtn = 'edit-event-set-sleeper';break;
        case 'Driving' : statusBtn = 'edit-event-set-driving';break;
        case 'ddd' : statusBtn = 'edit-event-set-ym';break;
        case 'ddd' : statusBtn = 'edit-event-set-pc';break;
        case 'On Duty' : statusBtn = 'edit-event-set-on-duty';break;
    }
    moveHistoryStr += "moveHistory[" + ind + "]['statusBtn'] = '" + statusBtn + "';";

    if (i+1 === count) {
        console.log( moveHistoryStr );
        //copy( moveHistoryStr );
        localStorage["logBookDay"] = moveHistoryStr;
    }

});


javascript:

    var moveHistory = [];

var moveHistoryStr = "var moveHistory = [];";

var dataClass;
if ($("#eld-ev-s-text-content")[0]) dataClass = $("#eld-ev-s-text-content > tr");
else dataClass = $("#eld-ev-o-text-content  > tr");

var count = $( dataClass ).length;

$( dataClass ).each(function(i) {

    var ind = $(this).find("td:nth-child(1)").text().trim();
    var loc = $(this).find("td:nth-child(5)").text().trim();
    var timeStart = $(this).find("td:nth-child(3)").text().trim();
    var status = $(this).find("td:nth-child(2)").text().trim();
    var notes = $(this).find("td:nth-child(8)").text().trim();

    if (notes == "") notes = " ";
    moveHistory[ ind ] = [];

    moveHistory[ ind ]["loc"] = loc;
    moveHistory[ ind ]["timeStart"] = timeStart;
    moveHistory[ ind ]["status"] = status;

    moveHistoryStr += "moveHistory[" + ind + "] = [];";

    moveHistoryStr += "moveHistory[" + ind + "][\"loc\"] = \"" + loc + "\";";
    moveHistoryStr += "moveHistory[" + ind + "][\"timeStart\"] = \"" + timeStart + "\";";
    moveHistoryStr += "moveHistory[" + ind + "][\"status\"] = \"" + status + "\";";
    moveHistoryStr += "moveHistory[" + ind + "][\"notes\"] = \"" + notes + "\";";
    var statusBtn = "";
    switch (status) {
        case "Off Duty" : statusBtn = "edit-event-set-off-duty";break;
        case "SB" : statusBtn = "edit-event-set-sleeper";break;
        case "Driving" : statusBtn = "edit-event-set-driving";break;
        case "ddd" : statusBtn = "edit-event-set-ym";break;
        case "ddd" : statusBtn = "edit-event-set-pc";break;
        case "On Duty" : statusBtn = "edit-event-set-on-duty";break;
    }
    moveHistoryStr += "moveHistory[" + ind + "][\"statusBtn\"] = \"" + statusBtn + "\";";

    if (i+1 === count) {
        console.log( moveHistoryStr );
//copy( moveHistoryStr );
        localStorage["logBookDay"] = moveHistoryStr;
    }

});











var moveHistory = [];var moveHistoryStr = "var moveHistory = [];";var dataClass;if ($("#eld-ev-s-text-content")[0]) dataClass = $("#eld-ev-s-text-content > tr");else dataClass = $("#eld-ev-o-text-content  > tr");var count = $( dataClass ).length;$( dataClass ).each(function(i) {var ind = $(this).find("td:nth-child(1)").text().trim();var loc = $(this).find("td:nth-child(5)").text().trim();var timeStart = $(this).find("td:nth-child(3)").text().trim();var status = $(this).find("td:nth-child(2)").text().trim();var notes = $(this).find("td:nth-child(8)").text().trim();if (notes == "") notes = " ";moveHistory[ ind ] = [];moveHistory[ ind ]["loc"] = loc;moveHistory[ ind ]["timeStart"] = timeStart;moveHistory[ ind ]["status"] = status;moveHistoryStr += "moveHistory[" + ind + "] = [];";moveHistoryStr += "moveHistory[" + ind + "][\"loc\"] = \"" + loc + "\";";moveHistoryStr += "moveHistory[" + ind + "][\"timeStart\"] = \"" + timeStart + "\";";moveHistoryStr += "moveHistory[" + ind + "][\"status\"] = \"" + status + "\";";moveHistoryStr += "moveHistory[" + ind + "][\"notes\"] = \"" + notes + "\";";var statusBtn = "";switch (status) {case "Off Duty" : statusBtn = "edit-event-set-off-duty";break;case "SB" : statusBtn = "edit-event-set-sleeper";break;case "Driving" : statusBtn = "edit-event-set-driving";break;case "ddd" : statusBtn = "edit-event-set-ym";break;case "ddd" : statusBtn = "edit-event-set-pc";break;case "On Duty" : statusBtn = "edit-event-set-on-duty";break;}moveHistoryStr += "moveHistory[" + ind + "][\"statusBtn\"] = \"" + statusBtn + "\";";if (i+1 === count) {console.log( moveHistoryStr );//copy( moveHistoryStr );localStorage["logBookDay"] = moveHistoryStr;}});





