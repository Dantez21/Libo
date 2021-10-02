<?php 

    echo view('common/header');

    // var_dump($booksInfo);
?>
    <div class="main1">
        <div class="topp-bar">
            <div class="navv-bar">
        
                <div class="alert alert-information"><h1>Hello,<Strong> Daniel Wambua</strong></h1>&nbsp
                    <p>Welcome to LIBO online Library <br>
                     &nbsp&nbsp &nbsp For Everyone, for all</p> 
                    <?php       
                    $Today = date('y:m:d');
                    $new = date('l, F d, Y',
                    strtotime($Today));
                    echo $new;
                    ?>
                </div>

            </div>
            <div class="book1">
                <img src="Images/book1.png" height="130px">
            </div>
        </div>
        <div class="mainn">
            <div class="headerr">
                <h2>August <span>16 - 23</span></h2>
                <div class="picture">
                 <img src="Images/previous.png" alt="">
                 <img src="Images/next.png" alt="">
                </div>
            </div>
            <div class="calendar">
                <img src="Images/calendar.png" height="20px" alt="">
                <h4>Month</h4>
            </div>
        </div>
        <div class="data-reportts">
            <div class="weekly-reportts">
                <h2>Weekly Reports</h2>
            <div class="dattes"><span>Today</span> <span>Week</span> <span>Month</span></div>
            </div>
            <div class="reportts">
                <div class="rating-figg">
                    <img src="Images/rating.png" style="width: 60px;" alt="">
                    <h3>Favourite <span>Books</span> </h3>
                </div>
                <div class="rating-figg">
                    <div class="ratings"><h2>00</h2></div>
                    <h3>Read <span>Books</span> </h3>
                </div>
                <div class="rating-figg">
                    <div class="ratings"><h2>00</h2></div>
                    <h3>Suggested <span>Books</span> </h3>
                </div>
                <div class="rating-figg">
                    <div class="ratings"><h2>00</h2></div>
                    <h3>Tutorials <span>Viewed</span> </h3>
                </div>
            </div>
        </div>  
        <div class="meddia">
            <h2>Share the reading power</h2>
            <div class="share-platforms">
                <div class="faccebook">
                    <a href="https://www.facebook.com/my_page" class="fa fa-facebook">Facebook</a>
                    <img src="Images/facebook.png" style="width: 30px; height: 30px;" alt="">
                </div>
                <div class="WhattsApp">
                    <a href="https://api.whatsapp.com/send?phone=254790682630" class="fa fa-whatsapp">WhatsApp</a>
                    <img src="Images/asap.png" style="width: 30px; height: 30px;" alt="">
                </div>
            </div>
        </div> 
    </div>
    <div class="bottomm">
        <div class="topp-left">
            <div class="navv-left">
                <div class="notificationn-btn">
                    <img src="Images/notifications.png" alt="">
                    <div class="notificationns">3</div>
                </div>
            </div>
            <div class="navv-left">
                <img src="Images/setting.png" alt="">
            </div>
            <div class="navv-left">
                <img src="Images/user1.png" alt="">
            </div>
        </div> 
        <div class="contennt-left">
            <section class="glass_cad">
                <div class="books_status">
                    <h2>Books' Summary</h2>
                </div>
                <div class="cads-view">
                    <div class="cads">
                        <div class="cad1">
                            <img src="Images/book3.png" alt="">
                            <p>Available Books <button class="btn">View</button></p>
                        </div>
                    </div>
                    <div class="cads">
                        <div class="cad2">
                            <img src="Images/share.png" alt="">
                            <p>Shared Books <button class="btn">View</button></p>
                        </div>
                    </div>
                </div>
                <div class="cads-view">
                    <div class="cads">
                        <div class="cad3">
                            <img src="Images/tutorial.png" alt="">
                            <p>Available Tutorials <button class="btn">View</button></p>
                        </div>
                    </div>
                    <div class="cads">
                        <div class="cad4">
                            <img src="Images/notify.png" alt="">
                            <div class="switch-toggle-btn">
                                <p>Notifications</p>
                                <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cad-info">
                    <h2>Reading Summary</h2>
                    <div class="glass2-reading-summary">
                        <div class="progress-information">
                            <h4>Thursday<span>33%</span></h4>
                            <img src="Images/process.png" alt="">
                        </div>
                        <div class="weekly-reading-progress">
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Mon</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Tue</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Wed</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Thur</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Fri</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Sat</h5>
                            </div>
                            <div class="reading-progress">
                                <div class="reading-progress-bar"></div>
                                <h5>Sun</h5>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
   </div>
   <?=view('common/footer') ?>
</body>
</html>
  