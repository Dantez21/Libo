<?php 

    echo view('common/header');

    // var_dump($booksInfo);
?>
<div class="main-content">
<div class="top-nav">
    <h2>BOOKs</h2>  
    <div class="top-right">
        <div class="navright">
            <div class="notification-btn">
                <img src="Images/notifications.png" alt="">
                <div class="notifications">3</div>
            </div>
        </div>
        <div class="navright">
            <img src="Images/setting.png" alt="">
        </div>
        <div class="navright">
            <img src="Images/user1.png" alt="">
        </div>
    </div> 
</div>
    <div class="admin-books-view">
        <div class="available-books">
            <div class="books-view">
                <h3>50 <br> <span>Books</span> </h3>
            </div>
            <div class="glass3">

                            <!-- CSRF token --> 
                <input type="hidden" class="txt_csrfname" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />

                <!-- Table -->
                <table id='bookTable' class='display dataTable'>

                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Description</th>
                    </tr>
                </thead>

                </table>
                <!-- <input type="text" name="" placeholder="Search Books...">
                <div class="table-field">
                <table id="example" class="display" style="width:100%" >
                    <thead style="font-size: 15px; font-weight:bold">
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Date Published</th>
                        <th>Date Added</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr style="font: size 12px;font-weight:lighter;">
                        <td>1</td>
                        <td style="font-weight: bold;">The Sun Goes Down</td>
                        <td>Ernest</td>
                        <td>14 August,2018</td>
                        <td>14 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>2</td>
                        <td style="font-weight: bold;">The Geat Gatsby</td>
                        <td>F.Scott</td>
                        <td>13 Jul,2011</td>
                        <td>15 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>3</td>
                        <td style="font-weight: bold;">Jane Eyre</td>
                        <td>Charllote</td>
                        <td>5 Feb,2009</td>
                        <td>17 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>4</td>
                        <td style="font-weight: bold;">Baby Names</td>
                        <td>Matlda</td>
                        <td>11 Sep,2013</td>
                        <td>20 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>5</td>
                        <td style="font-weight: bold;">The Grapes Wrath</td>
                        <td>Narte</td>
                        <td>17 Dec,2003</td>
                        <td>20 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>6</td>
                        <td style="font-weight: bold;">Odyssey</td>
                        <td>Roald</td>
                        <td>25 March,2000</td>
                        <td>22 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    <tr style="font: size 15px;font-weight:lighter;">
                        <td>7</td>
                        <td style="font-weight: bold;">Of Mice and Men</td>
                        <td>William</td>
                        <td>15 Nov,2018</td>
                        <td>23 August,2021</td>
                        <td style="text-align: center;"><img src="images/add-icon.png" alt=""></td>
                    </tr>
                    </tbody>
                </table>
                </div>
               <div class="total-entries">
                    <p style="color: #BF78DD; margin-left:0px; padding-top: 20px; ">Showing 1 to 7 of 50 entries(Filtered from 7 entries)</p>
                    <div class="pre-next-button">
                        <a href="">Previous</a><span class="prev">1</span><span>2</span>  <a href="">Next</a>
                    </div>
               </div> -->
            </div>
        </div>
            <form action="<?=base_url()?>/books/save" method="post">
            <div class="update-form">
                <div class="glass4">
                    <div class="glass4-content">
                        <h4>Add a Book</h4>
                        <div class="preference">
                            <label for="name">Name</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_name" placeholder="The Innovators"><br><br>
                        </div>
                        <div class="preference">
                            <label for="name">Author</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_author" placeholder="Walter Isaac"><br><br>
                        </div>
                        <div class="preference">
                            <label for="name">Date Published</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="book_description" placeholder="23 September, 2021" ><br><br>
                            <img src="images/calendar1.png" alt="">
                        </div>
                        <div class="preference">
                            <label for="name">Type</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="" placeholder="Technology"><br><br>
                            <img src="images/drop-down-btn.png" id="drop-down" alt="">
                        </div>
                        <div class="preference">
                            <label for="name">Attach a file(*pdf)</label> <br><br>
                            <input type="text" style="width: 320px; height: 35px;" name="" placeholder="Attach a file here..."><br><br>
                            <img src="images/files.png" id="files-icon" alt="">
                        </div>
                        <input type="submit" style="width: 330px; height:35px" name="submit" value="SAVE">
                    </div>
                </div>
            </div>
            </form>
    </div>
    <?=view('common/footer') ?>
</div>

<!-- Script -->
<script type="text/javascript">
   $(document).ready(function(){
      $('#userTable').DataTable({
         'processing': true,
         'serverSide': true,
         'serverMethod': 'post',
         'ajax': {
            'url':"<?=base_url('books/getBooks')?>",
            'data': function(data){
               // CSRF Hash
               var csrfName = $('.txt_csrfname').attr('name'); // CSRF Token name
               var csrfHash = $('.txt_csrfname').val(); // CSRF hash

               return {
                  data: data,
                  [csrfName]: csrfHash // CSRF Token
               };
            },
            dataSrc: function(data){

              // Update token hash
              $('.txt_csrfname').val(data.token);

              // Datatable data
              return data.aaData;
            }
         },
         'columns': [
            { data: 'id' },
            { data: 'name' },
            { data: 'author' },
            { data: 'description' },
         ]
      });
   });
   </script>