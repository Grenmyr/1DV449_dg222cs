<?php
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-18
 * Time: 15:59
 */

class LoginView {
    private static $userName = 'username';
    private static $password = 'password';




    public function GetUsername(){
        if(isset($_POST[self::$userName])){
            return($_POST[self::$userName]);
        }
        return false;
    }
    Public function GetPassword(){
        if(isset($_POST[self::$password])){
            return($_POST[self::$password]);
        }
        return false;
    }
    public function showTitle(){
        return "Mezzy Labbage - Logga in";
    }
    public function showHead(){
         $head ="

    <link rel='shortcut icon' href='pic/favicon.png'>

    <!-- Bootstrap core CSS -->
    <link href='css/bootstrap.min.css' rel='stylesheet'>
  <!--  <script src='js/bootstrap.js'></script>-->

    <!-- Custom styles for this template -->
      <link href='css/login.css' rel='stylesheet'>
      ";

        return $head;
    }
    public function showBody()
    {
        return "<div class='container'>

        <form class='form-signin'  method='POST'>
        <h2 class='form-signin-heading'>Log in</h2>
        <input value='' name='".self::$userName."' type='text' class='form-control' placeholder='Användarnamn' required autofocus>
        <input value='' name='".self::$password."' type='password' class='form-control' placeholder='Password' required>
        <button class='btn btn-lg btn-primary btn-block' type='submit'>Log in</button>
      </form>
    </div>
     <!-- /container -->";
    }
}