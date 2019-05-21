// $('#eld-ev-text-content  > tr').find('td:nth-child(2)').text().trim();

var moveHistory = [];

var moveHistoryStr = "var moveHistory = [];";

var count = $('#eld-ev-text-content  > tr').length;

var i = count;

$('#eld-ev-text-content  > tr').each(function(j) {

    i = i - j;
loopBody(i);



});



function loopBody(i){
    setTimeout(function(){



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

        if (i > 1){
            console.log( 'editBtn' + i );
            document.getElementById('editBtn' + i).click();

            /*****************  hours move  ****************/
            setTimeout(function(){
                function timeMove(hours, minutes) {

                    document.getElementById('EventTime2').click();

                    function datePickerMove(id, count, index) {
                        $(".bootstrap-timepicker-widget").find('tr:nth-child(1)').find('td:nth-child(' + index + ') a').attr("id", id);

                        for (var i = 1; i <= count; i++)
                            document.getElementById(id).click();
                    }

                    if ($("#EventNotes").val() == '') $("#EventNotes").val(" ");

                    datePickerMove("timeHoursSel", hours, 1);
                    datePickerMove("timeMinutesSel", minutes, 3);
                    document.getElementById("eld_log_edit_save_button").click();

                }

                timeMove(hTime, mTime);

            }, 200);
            /********************   hours move  ********************/

        }

    },500 + ( i * 1500 ));

    /*if (i+1 === count) {
        loopBody(i+1);
    }*/
}

var hTime = 2, mTime = 50;
function startTime(t1,t2){
    hTime = t1;
    mTime = t2;
}
startTime(2,50);









//https://www.google.com/maps/dir/Addison+City,+IL,+USA/Lake+Havasu+City,+Arizona,+USA/Gallup,+New+Mexico/@?hl=en
// +USA/Tucumcari,+New+Mexico+88401,+USA/@?hl=en
//34.9256669,-113.663478,6z/data=!4m26!4m25!1m5!1m1!1s0x80ce417f63491835:0x9fbdeda4ee4b8f37!2m2!1d-114.5285981!2d35.1359386!1m5!1m1!1s0x80d1f216ee89e023:0x98de83cfb72ad3e2!2m2!1d-114.3224548!2d34.483901!1m5!1m1!1s0x8724de8d2f65540f:0x5fd56904653b804c!2m2!1d-108.7425843!2d35.5280783!1m5!1m1!1s0x871b3865e7ec4185:0x31feda0f1b630f7c!2m2!1d-103.7249662!2d35.171723!3e0?hl=en















