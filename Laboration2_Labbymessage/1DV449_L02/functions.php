<?php

//require_once("src/model/Repository.php");
//require_once("src/model/LongPoll.php");
//require_once("src/model/Validate.php");
use src\model\Validate;

require_once("get.php");
require_once("post.php");
require_once("sec.php");
//sec_session_start();

/*
* It's here all the ajax calls goes
*/
if(isset($_GET['function'])) {

	if($_GET['function'] == 'logout') {
		logout();
    } 
    elseif($_GET['function'] == 'add') {
	    //$name = $_GET["name"];
		//$message = $_GET["message"];
        //$validate = new Validate();
       // $validate->setMessages($message,$name);

		//addToDB($message, $name);
		//header("Location: test/debug.php");
    }
    elseif($_GET['function'] == 'getMessages') {
        //$lp = new LongPoll();
        //$message = $lp->getMessages();
        //var_dump($message);
        //$validate->getMessages()
  	   /*	echo(json_encode(getMessages()));
         echo(json_encode($message));*/

    }
}