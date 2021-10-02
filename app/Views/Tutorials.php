<?php 

    echo view('common/header');

    // var_dump($booksInfo);
?>
<div class="main-content">
<div class="topp-nav">
    <h2><strong>TUTORIALS</strong></h2>  
    <div class="topp-right">
        <div class="navv-right">
            <div class="notificationn-btn">
                <img src="Images/notifications.png" alt="">
                <div class="notificationns">3</div>
            </div>
        </div>
        <div class="navv-right">
            <img src="Images/setting.png" alt="">
        </div>
        <div class="navv-right">
            <img src="Images/user1.png" alt="">
        </div>
    </div> 
</div>
    <div class="admin-books-view">
        <div class="available-books">
            <div class="books-view">
                <h3> 25 <br> <span>Tutorials</span> </h3>
            </div>
            <div class="glass3">

                            <!-- CSRF token --> 
                <input type="hidden" class="txt_csrfname" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />

                <!-- Table -->
                <table id='dataTable' class='table table-hover'>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>username</th>
                        </tr>
                    </thead>

                </table>
               
            </div>
        </div>
            <form action="<?=base_url()?>/upload" method="post" enctype="multipart/form-data">
            <div class="update-form">
                <div class="upload-form">
                    <div class="upload-form-info">
                        <h4>Add a Tutorial</h4>
                        <div class="preference">
                            <label for="name">Name</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_name" placeholder="The Innovators"><br><br>
                        </div>
                        <!-- <div class="preference">
                            <label for="name">Author</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_author" placeholder="Walter Isaac"><br><br>
                        </div>
                        <div class="preference">
                            <label for="name">Date Published</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_description" placeholder="23 September, 2021" ><br><br>
                            <img src="images/calendar1.png" alt="">
                        </div> -->
                        <div class="preference">
                            <label for="name">Type</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="" placeholder="Technology"><br><br>
                            <img src="images/drop-down-btn.png" id="drop-down-icon" alt="">
                        </div>
                        <div class="preference">
                            <label for="name">Attach a file(*mp4, mkv)</label> <br><br>
                            <div class="upload-preference">
                                <input type="file" style="width: 320px; height: 35px;" name="fileToUpload" id="fileToUpload" placeholder="Attach a file here..."><br><br>
                                <img src="images/files.png" id="file-tutorial-icon" alt="">
                            </div>
                        </div>
                        <input type="submit" style="width: 330px; height:35px; margin-left: 25px;" name="submit" value="SAVE">
                    </div>
                </div>
            </div>
            </form>
    </div>
    <?=view('common/footer') ?>
</div>

<!-- Script -->
<script>
   $(document).ready(function(){

    var table = $("#dataTable").DataTable({
			
			"columnDefs" : [

				{"targets" : [1,2,3] , "orderable" : false},
				// {"targets" : [0,1] , "visible" : false},
			],

			"iDisplayLength": 5,

			"order": [],

			"language": { "sSearch": "", "searchPlaceholder" : "Search tutorials ..." },

			serverSide: true,

			processing: true,

            paginate: true,

			ajax : {
				url : "<?=base_url() ?>/books/getBooks",
				data : function ( d ) {

					// blockElement($(".wrapper"));
					console.log(d)
				}
			},

			"rowCallback": function ( row, data, index ) { // Open Item on click	
		
				console.log('row clicked');
			},

			"dom": "<'row' <'col-sm-6 text-left'f> >"+"<'row padded'<'col-sm-12'tr>>" + "<'row' <'col-sm-6'i> <'col-sm-6 text-right'p>>"
        
		});
   });
</script>