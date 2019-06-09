
var count = $('#eld-ev-text-content  > tr').length;

for (i = count; i > 1; i--) {
    loopBody(i);
}

function loopBody(i){

        setTimeout(function(){

            $('#eld-ev-text-content  > tr:nth-child('+i+')').find('td:nth-child(7) span').attr('id', 'editBtn' + i);

            console.log( 'editBtn' + i );
            document.getElementById('editBtn' + i).click();

                function timeMove(hours, minutes) {



                    document.getElementById('EventTime1').click();

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

                timeMove(hTime, mTime);


        },500 + ( (count + 1 - i) * 1800 ));

}

var hTime = 1, mTime = 10;

function startTime(t1,t2){
    hTime = t1;
    mTime = t2;
}

var hmtime = prompt('Введите время в формате часы : минуты через пробел Н: 1 12');

var hmtimeArr = hmtime.trim().split(' ');

if ( hmtimeArr[ 0 ] !== '' && hmtimeArr[ 1 ] !== '' ) {
    console.log( hmtimeArr[ 0 ], hmtimeArr[ 1 ] );

    startTime( parseInt( hmtimeArr[ 0 ] ) , parseInt( hmtimeArr[ 1 ] ));
} else alert('Время введено не верно ! ');




