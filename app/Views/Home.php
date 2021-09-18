<?php 

    echo view('common/header');

    // var_dump($booksInfo);
?>
    <div class="main1">
        <div class="topbar">
            <div class="navbar">
                <h1>Hello, Daniel Wambua</h1>
                <p>Welcome to LIBO online Library <br>
                    For Everyone, for all
                </p>
            </div>
            <div class="book1">
                <img src="Images/book1.png" height="130px">
            </div>
        </div>
        <div class="main">
            <div class="header">
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
        <div class="data-reports">
            <div class="weekly-reports">
                <h2>Weekly Reports</h2>
            <div class="dates"><span>Today</span> <span>Week</span> <span>Month</span></div>
            </div>
            <div class="reports">
                <div class="rating-fig">
                    <img src="Images/rating.png" style="width: 60px;" alt="">
                    <h3>Favourite <span>Books</span> </h3>
                </div>
                <div class="rating-fig">
                    <div class="rating"><h2>00</h2></div>
                    <h3>Read <span>Books</span> </h3>
                </div>
                <div class="rating-fig">
                    <div class="rating"><h2>00</h2></div>
                    <h3>Suggested <span>Books</span> </h3>
                </div>
                <div class="rating-fig">
                    <div class="rating"><h2>00</h2></div>
                    <h3>Tutorials <span>Viewed</span> </h3>
                </div>
            </div>
        </div>  
        <div class="media">
            <h2>Share the reading power</h2>
            <div class="share-platforms">
                <div class="facebook">
                    <a href="https://www.facebook.com/my_page" class="fa fa-facebook">Facebook</a>
                    <img src="Images/facebook.png" style="width: 10px; height: 20px;" alt="">
                </div>
                <div class="WhatsApp">
                    <a href="https://api.whatsapp.com/send?phone=254790682630" class="fa fa-whatsapp">WhatsApp</a>
                    <img src="Images/asap.png" style="width: 10px; height: 20px;" alt="">
                </div>
            </div>
        </div> 
    </div>
    <div class="bottom">
        <div class="top-left">
            <div class="navleft">
                <div class="notification-btn">
                    <img src="Images/notifications.png" alt="">
                    <div class="notifications">3</div>
                </div>
            </div>
            <div class="navleft">
                <img src="Images/setting.png" alt="">
            </div>
            <div class="navleft">
                <img src="Images/user1.png" alt="">
            </div>
        </div> 
        <div class="content-left">
            <section class="glass">
                <div class="status">
                    <h2>Books' Summary</h2>
                </div>
                <div class="cards-view">
                    <div class="cards">
                        <div class="card1">
                            <img src="Images/book3.png" alt="">
                            <p>Available Books <button class="btn">View</button></p>
                        </div>
                    </div>
                    <div class="cards">
                        <div class="card2">
                            <img src="Images/share.png" alt="">
                            <p>Shared Books <button class="btn">View</button></p>
                        </div>
                    </div>
                </div>
                <div class="cards-view">
                    <div class="cards">
                        <div class="card3">
                            <img src="Images/tutorial.png" alt="">
                            <p>Available Tutorials <button class="btn">View</button></p>
                        </div>
                    </div>
                    <div class="cards">
                        <div class="card4">
                            <img src="Images/notify.png" alt="">
                            <p>Notifications</p>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <h2>Reading Summary</h2>
                    <div class="glass2">
                        <div class="progress-info">
                            <h4>Thursday<span>33%</span></h4>
                            <img src="Images/process.png" alt="">
                        </div>
                        <div class="weekly-progress">
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Mon</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Tue</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Wed</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Thur</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Fri</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
                                <h5>Sat</h5>
                            </div>
                            <div class="progress">
                                <div class="progressbar"></div>
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
  