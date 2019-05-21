
var ind = 0;

function insertDutyStatus(index){
    document.getElementById("eld_add_status").click();

    ind = index;

    setTimeout(function(){

        $("#EventTime1").val( moveHistory[ind]['timeStart'] );
        if(typeof moveHistory[ind + 1]['timeStart'] !== 'undefined') $("#EventTime2").val( moveHistory[ind + 1]['timeStart'] );
        $("#EventLocation").val( moveHistory[ind]['loc'] );
        $("#EventNotes").val( moveHistory[ind]['notes'] );

        document.getElementById('EventTime1').click();


        document.getElementById(moveHistory[ind]['statusBtn']).click();

        //document.getElementById("eld_log_edit_save_button").click();

    }, 500);

}

insertDutyStatus(1);

