<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="<?=base_url()?>/css/style.css">
    <title>login</title>
</head>
<body>
    <div class="loginbox">
        <?php if(!empty($data)) {?>
            <p><?=$msg?></p>
        <?php } ?>
        <h1 style="padding: 30px;">User Login</h1>
        <form action="<?=base_url()?>/login" method="POST">
            <div>
              <input type="text" name="username" placeholder="Username" required>
            </div>
            <input type="password" name="password" placeholder="Password" required><a href="#">Forgot password?</a><br>
            <a href="<?=base_url()?>/home"><input type="submit" name="submit" value="Login"></a>
            <p>Don't have an account? <a href="<?=base_url()?>/register">Sign Up</a></p>
        </form>
    </div>
</body>
</html>