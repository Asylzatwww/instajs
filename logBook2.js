
var ind = 0;

function timeMove(hours, minutes) {

    document.getElementById('EventTime2').click();

    function datePickerMove(id, count, index) {
        $('.bootstrap-timepicker-widget').find('tr:nth-child(1)').find('td:nth-child(' + index + ') a').attr('id', id);

        for (var i = 1; i <= count; i++)
            document.getElementById(id).click();
    }

    if ($('#EventNotes').val() == '') $('#EventNotes').val(' ');

    datePickerMove('timeHoursSel', hours, 1);
    datePickerMove('timeMinutesSel', minutes, 3);
    if ( $('#tab-default').hasClass('active') == false ) document.getElementById('eld_log_edit_save_button').click();

}

function insertDutyStatus(index){
    document.getElementById("eld_add_status").click();

    ind = index;

    setTimeout(function(){

        $("#EventTime1").val( moveHistory[ind]['timeStart'] );
        if(typeof moveHistory[ind]['timeStart'] !== 'undefined') $("#EventTime2").val( moveHistory[ind]['timeStart'] );
        $("#EventLocation").val( moveHistory[ind]['loc'] );
        $("#EventNotes").val( moveHistory[ind]['notes'] );

        document.getElementById('EventTime2').click();


        document.getElementById(moveHistory[ind]['statusBtn']).click();

        //document.getElementById("eld_log_edit_save_button").click();



        timeMove(10, 0);



        //timeMove(0, 1);


        document.getElementById(moveHistory[ind]['statusBtn']).click();

        setTimeout(function(){
            if ( $('#tab-default').hasClass('active') == false )document.getElementById("eld_log_edit_save_button").click();

            if (cycleIndex < moveHistory.length - 1) {
                cycleIndex++;
                insertDutyStatus(cycleIndex);
            }

        }, 1000 + 80*index);

    }, 1000 + 60*index);

}
var cycleIndex = 1;
insertDutyStatus(cycleIndex);


var dayData = prompt('Введите данные дня для переноса : ');

eval( dayData );


