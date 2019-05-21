

        /*****************  hours move  ****************/

        function timeMove(hours, minutes) {

            document.getElementById('EventTime1').click();

            //document.getElementById('editBtn2').click();

            function datePickerMove(id, count, index) {
                $(".bootstrap-timepicker-widget").find('tr:nth-child(3)').find('td:nth-child(' + index + ') a').attr("id", id);

                for (var i = 1; i <= count; i++)
                    document.getElementById(id).click();
            }

            if ($("#EventNotes").val() == '') $("#EventNotes").val(" ");

            datePickerMove("timeHoursSel", hours, 1);
            datePickerMove("timeMinutesSel", minutes, 3);
            document.getElementById("eld_log_edit_save_button").click();

        }

        timeMove(2, 50);


        /********************   hours move  ********************/







