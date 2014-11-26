<?php
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-18
 * Time: 19:39
 */

class MessageView {
    private static $logoutButton = 'logoutButton';
    private static $token;

    Public function userLoggedOut(){
        if(isset($_POST[self::$logoutButton])){
            return true;
        }
        return false;
    }

    Public function setTokenValue($token){
        self::$token =  $token;
    }


    public function showTitle(){
        return "Messy Labbage";
    }
    public function showHead(){

        return "

    <link rel='apple-touch-icon' href='touch-icon-iphone.png'>
    <link rel='apple-touch-icon' sizes='76x76' href='touch-icon-ipad.png'>
    <link rel='apple-touch-icon' sizes='120x120' href='touch-icon-iphone-retina.png'>
    <link rel='apple-touch-icon' sizes='152x152' href='touch-icon-ipad-retina.png'>
    <link rel='shortcut icon' href='pic/favicon.png'>
    <link rel='stylesheet' type='text/css' href='css/bootstrap.min.css' />




	<!--<script src='js/bootstrap.js'></script>-->
     <link href='css/mess.css' rel='stylesheet'>

	";
    }
    public function showBody(){

        return"<div id='container'>


            <div id='messageboard'>
              <form method='POST'>
                <input class='btn btn-danger' type='submit' name='".self::$logoutButton."' id='buttonLogout1' value='Logout' style='margin-bottom: 20px;' />
             </form>
                <div id='messagearea'></div>

                <p id='numberOfMess'>Antal meddelanden: <span id='nrOfMessages'>0</span></p>
                Name:<br /> <input id='inputName' type='text' name='name' /><br />
                Message: <br />
                <textarea name='mess' id='inputText' cols='55' rows='6'></textarea>

                <input type='hidden'  id='tokenfield' value='".self::$token."' >

                <input class='btn btn-primary' type='button' id='buttonSend' value='Write your message' />

                <span class='clear'>&nbsp;</span>

            </div>

        </div>

        <!-- This script is running to get the messages -->

	<script  src='js/jquery-1.10.2.min.js' defer></script>
	<script  src='js/longpoll.js' defer></script>
	<script src='Message.js' defer></script>
	<script src='MessageBoard.js' defer></script>


        ";
    }

}