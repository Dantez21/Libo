<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>/css/style.css">

    <!-- Toastr style -->
	<!-- <link href="<?=base_url(); ?>/../css/toastr/toastr.min.css" rel="stylesheet"></link> -->

    <link href="<?=base_url(); ?>/css/bootstrap.min.css" rel="stylesheet"></link>
    <!-- <link href="<?=base_url(); ?>/../css/jquery.dropdown.css" rel="stylesheet"></link>
    <link href="<?=base_url(); ?>/../fonts/featherIcons/feather.css" rel="stylesheet"></link> -->

    <!-- <link rel="stylesheet" type="text/css" href="/fonts/linearicons/linearicons.css"> -->

    <!-- <link href="<?=base_url(); ?>/../css/animate.css" rel="stylesheet"></link>
    <link href="<?=base_url(); ?>/../css/style.css" rel="stylesheet"></link>
    <link href="<?=base_url(); ?>/../css/admin_portal.css" rel="stylesheet"></link>
    <link href="<?=base_url(); ?>/../css/alertify.min.css" rel="stylesheet"></link> -->

    <!-- Data Tables -->
    <link href="<?=base_url(); ?>/css/dataTables/dataTables.material.css" rel="stylesheet"></link>
    <link href="<?=base_url(); ?>/css/dataTables/fixedHeader.dataTables.min.css" rel="stylesheet"></link>

    <!-- Mainly scripts -->
    <script src="<?=base_url(); ?>/js/jquery-2.1.1.js"></script>
    <script src="<?=base_url(); ?>/js/bootstrap.min.js"></script>
    <script src="<?=base_url(); ?>/js/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Data Tables -->
    <script src="<?=base_url(); ?>/js/dataTables/jquery.dataTables.js"></script>
    <script src="<?=base_url(); ?>/js/dataTables/dataTables.bootstrap.js"></script>
    <script src="<?=base_url(); ?>/js/dataTables/dataTables.responsive.js"></script>
    <script src="<?=base_url(); ?>/js/dataTables/dataTables.tableTools.min.js"></script>        
    <script src="<?=base_url(); ?>/js/dataTables/dataTables.fixedHeader.min.js"></script>       
    <script src="<?=base_url(); ?>/js/dataTables/fixedHeader.bootstrap.min.js"></script>

    <script src="<?=base_url(); ?>/js/manage_tables.js"></script>
    <script src="<?=base_url(); ?>/js/jquery.form.min.js"></script>
    <script src="<?=base_url(); ?>/js/alertify.js"></script>

    <!-- Jquery Validate -->
    <!-- <script src="<?=base_url(); ?>/../js/validate/jquery.validate.min.js"></script> -->

    <!-- Toastr script -->
    <!-- <script src="<?=base_url(); ?>/../js/toastr/toastr.min.js"></script> -->
    <title>Document</title>
</head>
<body>
    <div class="modal" id="detailModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">User Details</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body" id="user-details">

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            var dataTable = $('#user_data_table').DataTable({
                "processing":true,
                "serverSide":true,
                "order":[],
                "ajax":{
                    url:"ajax_action.php",
                    type:"POST",
                    data:{action:'fetch', page:'user'}
                },
                "columnDefs":[
                    {
                        "targets":[0,6],
                        "orderable":false
                    },
                ],
            });

            $(document).on('click', '.details', function(){
                var user_id = $(this).attr('id');
                $.ajax({
                    url:"ajax_action.php",
                    method:"POST",
                    data:{action:'fetch_data', user_id:user_id, page:'user'},
                    success:function(data)
                    {
                        $('#user_details').html(data);
                        $('#detailModal').modal('show');
                    }
                })
            })
        });
    </script>
</body>
</html>