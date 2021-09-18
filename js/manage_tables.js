
function enable_delete(confirm_message, none_selected_message)
{

    //Keep track of enable_delete has been called
    if (!enable_delete.enabled)
        enable_delete.enabled = true;

    $(document).on('click', '#delete', function (event)
    {
        event.preventDefault();
        
        var $this = $(this);

        var selected = $this.attr("data_id");

        if (new Number(selected) > 0)
        {
            alertify.confirm("Deleting a record !!", "<span style='font-size:40px;position:absolute;top:55px' class='fe fe-trash text-danger'></span> <span style='margin-left:55px'>" +confirm_message + "</span>", onOk, null).set('labels', {ok:'Yes', cancel:'cancel'});
            function onOk()
            {
                do_delete($this.attr('href'), selected);
            }
        }
        else
        {
            alertify.alert(none_selected_message);
        }
    });
}

function enable_delete_with_authentication(confirm_message, none_selected_message, user_id)
{

    //Keep track of enable_delete has been called
    if (!enable_delete_with_authentication.enabled)
        enable_delete_with_authentication.enabled = true;

    $(document).on('click', '#delete', function (event)
    {
        event.preventDefault();

        $("#username").val("");  // Clear username

        $("#password").val("");  // Clear Password
        
        var $this = $(this);

        var selected = $this.attr("data_id");

        if (new Number(selected) > 0)
        {
            alertify.confirm("Authentication required !!", confirm_message, onOk, null).set('labels', {ok:'confirm delete', cancel:'cancel'});

            function onOk()
            {
                // confirm that user is authorized to delete

                var username = $("#username").val();  

                var password = $("#password").val();

                if(username == "") username = "no_name";

                $.get("index.php/staff/can_delete_sale/" + username + "/" + password, function(response){

                    // console.log(response)

                    if (response == 0) {

                        set_feedback("Incorrect login credentials", 'warning_message', false);

                    }else if(response == 1){

                        set_feedback("Unauthorized user!!! Must be an Admin or the Management", 'warning_message', false);

                    }else if(response == 2){

                        do_delete($this.attr('href'), selected);

                    }else{

                        set_feedback("Could not delete record!! Contact System Admin for more info!", 'warning_message', false);

                    }

                });
            }
        }
        else
        {
            alertify.alert(none_selected_message);
        }
    });
}

enable_delete.enabled = true;
enable_delete_with_authentication.enabled = true;

function do_delete(url, selected)
{
    //If delete is not enabled, don't do anything

    if (!enable_delete.enabled || !enable_delete_with_authentication.enabled)
        return;

    $.post(url, {"id": selected, "softtoken" : $('#token_hash').val()}, function (response)
    {
        //delete was successful, remove checkbox rows
        if (response.success)
        {
            //get_data();
            set_feedback(response.message, 'success_message', false);

            setTimeout(function() {location.reload()}, 1000);
        }
        else
        {
            set_feedback(response.message, 'error_message', true);
        }

    }, "json");
}