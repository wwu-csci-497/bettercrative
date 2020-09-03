function set_active(classroom_id, quiz_id){
    event.preventDefault();
    $("#set_active_modal-" + quiz_id).modal("hide");
    // then send the data to the Python route
    $.ajax({
        type:'GET',
        data:{'classroom_id': classroom_id, 'quiz_id': quiz_id},
        url: '/classroom/'+classroom_id+'/'+quiz_id+'/set_active',
        error: function(response){
            console.log(response.statusText);
        },
        success: function(){
            var showQR = $("#generate_qr").prop("checked");
            console.log(showQR);
            refresh(".account-tables");
            if(showQR) {
                setTimeout(function() {
                    console.log("Generating QR code");
                    $("#qr_code_modal-" + quiz_id).modal();
                }, 20);
            }
        }
    })
}

function remove_active(classroom_id){
    $.ajax({
        type:'GET',
        data:{'classroom_id': classroom_id},
        url: '/classroom/'+classroom_id+'/remove_active',
        error: function(response){
            console.log(response.statusText);
        },
        success: function(){

            refresh('.account-tables');

        }
    })
}