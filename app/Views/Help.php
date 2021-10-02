<?php 

    echo view('common/header');

    // var_dump($booksInfo);
?>
<div class="main-content">
<div class="topp-nav">
    <h2><strong>FAQs documentation</strong></h2>  
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
              <h3>Frequently Ssked Questions </h3>
            </div>
            <div class="glass3">
               <select name="ddd" id="dd"><option value="ree">wwww</option></select>
            
            </div>
        </div>
            <form>
            <div class="update-form">
                <div class="upload-form">
                    <h4>Why FAQ documentation?</h4>
                    <p style="color: blue;">This FAQs documentation helps the users to interact with the system without facing any problems.</p>
                    <p style="color: blue;">It give users a glimpse of how to use system and all operations in it.</p>
                </div>
            </div>
            </form>
    </div>
    <?=view('common/footer') ?>
</div>