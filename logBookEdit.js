// $('#eld-ev-text-content  > tr').find('td:nth-child(2)').text().trim();

var moveHistory = [];

var moveHistoryStr = "var moveHistory = [];";

var count = $('#eld-ev-text-content  > tr').length;

$('#eld-ev-text-content  > tr').each(function(i) {

    historyGet(i);
    console.log(i);

loopBody(i);



});

//for (i = count; i > 1; i--){
/*for (i = 1; i < count; i++){
    loopBody(i);
}*/

function historyGet(i){
    var ind = $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(1)').text().trim();
    var loc = $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(5)').text().trim();
    var timeStart = $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(3)').text().trim();
    var status = $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(2)').text().trim();
    var notes = $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(6)').text().trim();

    $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(7) span').attr("id", "editBtn" + i);

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
}



function loopBody(i){

    if (i > 1 ){

    setTimeout(function(){



        $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(7) span').attr("id", "editBtn" + i);

        //alert(i);


            console.log( 'editBtn' + i );
            document.getElementById('editBtn' + i).click();

            /*****************  hours move  ****************/
            setTimeout(function(){
                function timeMove(hours, minutes) {

                    document.getElementById('EventTime1').click();

                    function datePickerMove(id, count, index) {
                        $(".bootstrap-timepicker-widget").find('tr:nth-child(3)').find('td:nth-child(' + index + ') a').attr("id", id);

                        for (var i = 1; i <= count; i++)
                            document.getElementById(id).click();
                    }

                    if ($("#EventNotes").val() == '') $("#EventNotes").val(" ");

                    datePickerMove("timeHoursSel", hours, 1);
                    datePickerMove("timeMinutesSel", minutes, 3);
                    if ( $('#tab-default').hasClass("active") == false ) document.getElementById("eld_log_edit_save_button").click();

                }

                timeMove(hTime, mTime);

            }, 200);
            /********************   hours move  ********************/



    },500 + ( (i - 1) * 1700 ));

    }

    if (i+1 === count) {
        loopBody(i+1);
    }
}

var hTime = 2, mTime = 50;
function startTime(t1,t2){
    hTime = t1;
    mTime = t2;
}

var hmtime = prompt("Введите время в формате часы : минуты через пробел Н: 1 12");

var hmtimeArr = hmtime.trim().split(" ");

//startTime(2,0);

if ( hmtimeArr[ 0 ] !== '' && hmtimeArr[ 1 ] !== '' ) {
    console.log( hmtimeArr[ 0 ], hmtimeArr[ 1 ] );

    startTime( parseInt( hmtimeArr[ 0 ] ) , parseInt( hmtimeArr[ 1 ] ));
} else alert("Время введено не верно ! ");


