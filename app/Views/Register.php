<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <title>Register</title>
    <style>
        #demo8::placeholder{
            margin-left: -55px;
        }

        .right-box a{
            text-decoration: none;
            font-size: 12px;
            line-height: 20px;
            color: white;
            margin-left: 5px;
        }
        .right-box p{
            font-size: 12px;
            line-height: 20px;
            color: white; 
        }
        .right-box a:hover{
            color: #ffc107;
        }
    </style>
</head>
<body>
    <form action="<?=base_url()?>/register/save" method="post">
        <div id="register-box">
            <div class="left-box">
                <h1>User Registration</h1>
                <select id="show_hide" onchange="check_selection();" name="user-type">
                    <option value="Student">Student</option>
                    <option value="Lecturer">Lecturer</option>
                </select>
                <div class="register-div" style="position: relative;">
                <span><img src="<?=base_url()?>/images/name.png" id="demo_1" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;" alt="" ></span><input type="text" id="demo" name="fname" placeholder="First Name" oninput="removeImg()" required>
                </div>
                <div class="register-div" style="position: relative;" >
                <span><img src="<?=base_url()?>/images/name.png" id="demo_2" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;"  alt="" ></span><input type="text" id="demo1" name="lname" placeholder="Last Name" oninput="removeImg_1()" required>
                </div>
                <div class="register-div" style="position: relative;">
                <span><img src="<?=base_url()?>/images/email.png" id="demo_3" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;" alt="" ></span><input type="text" id="demo2" name="email" placeholder="Email" oninput="removeImg_2()" >
                </div>
                <div class="register-div" style="position: relative;">
                <span><img src="<?=base_url()?>/images/contact.png" id="demo_4" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;" alt="" ></span><input type="text" id="demo3" name="phone-no" placeholder="Phone No" oninput="removeImg_3()" >
                </div>
                <div id="admno" class="register-div" style="position: relative;">
                <span><img src="<?=base_url()?>/images/email.png" id="demo_5" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;" alt="" ></span><input type="text" id="demo4" name="admno" placeholder="Adm No" oninput="removeImg_4()" >
                </div>
                <div class="register-div" style="position: relative;">
                <span><img src="<?=base_url()?>/images/intitution.png" id="demo_6" class="input-icons" style="width:15px; height:15px; position: absolute; bottom:10px; left:40px;" alt="" ></span><input type="text" id="demo5" name="institution" placeholder="Institution" oninput="removeImg_5()" >
                </div>
            </div>
            <div class="right-box">
                <div class="profile">
                    <img src="Images/Name.png" alt="">
                    <div class="camera"><img src="Images/camera.png" alt=""></div>
                </div>

                <div id="icons-button" style="position: relative;">
                <span><img src="<?=base_url()?>/images/username.png" id="demo_7" class="icons" style="width:15px; height:15px; position: absolute; bottom:35px; left:55px;" alt="" ></span><input type="text" id="demo6" name="username" placeholder="Username" oninput="removeImg_6()">
                </div>

                <div id="icons-button" style="position: relative;">
                <span><img src="<?=base_url()?>/images/password.png" id="demo_8" class="icons" style="width:15px; height:15px; position: absolute; bottom:35px; left:55px;" alt="" ></span><input type="password" id="demo7" name="password" placeholder="Password" oninput="removeImg_7()">
                </div>

               <div id="icons-button" style="position: relative;">
               <span><img src="<?=base_url()?>/images/password.png" id="demo_9" class="icons" style="width:15px; height:15px; position: absolute; bottom:35px; left:55px;" alt="" ></span><input type="password" id="demo8" name="password-2" placeholder="Confirm Password" oninput="removeImg_8()">
               </div>

               <p>Already have an account? <a href="<?=base_url()?>/login">Sign In</a></p>
            </div>
            <input type="submit" name="submit" value="Register">
            
        </div>
    </form>
        <script>

            // $(document).ready(function(){
            //     $("#show_hide").select(function(){
            //         if(('show_hide').value == "Lecturer")
            //            $("#admno").hide();
                    
            //         if(('show_hide').value == "Student")
            //            $("#admno").show();
                
            //     });
                  
            // });

            function check_selection() {
                if(document.getElementById('show_hide').value == "Lecturer") {
                    document.getElementById('admno').style.display = 'none';
                } else {
                    document.getElementById('admno').style.display = 'block';
                }
            }

            function removeImg(){
                var img_rm = document.getElementById("demo_1");
                var input_check = document.getElementById("demo").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }
            function removeImg_1(){
                var img_rm = document.getElementById("demo_2");
                var input_check = document.getElementById("demo1").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }
           
            function removeImg_2(){
                var img_rm = document.getElementById("demo_3");
                var input_check = document.getElementById("demo2").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_3(){
                var img_rm = document.getElementById("demo_4");
                var input_check = document.getElementById("demo3").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_4(){
                var img_rm = document.getElementById("demo_5");
                var input_check = document.getElementById("demo4").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_5(){
                var img_rm = document.getElementById("demo_6");
                var input_check = document.getElementById("demo5").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_6(){
                var img_rm = document.getElementById("demo_7");
                var input_check = document.getElementById("demo6").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_7(){
                var img_rm = document.getElementById("demo_8");
                var input_check = document.getElementById("demo7").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }

            function removeImg_8(){
                var img_rm = document.getElementById("demo_9");
                var input_check = document.getElementById("demo8").value;
                if(input_check != ""){
                img_rm.style.visibility = "hidden";
                }else{
                    img_rm.style.visibility = "visible"; 
                }
            }
        </script>
</body>
</html>
