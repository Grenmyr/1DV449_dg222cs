<?php

use src\model\Validate;

class LoginController {
    private $loginView;
    private $messageView;
    private $sessionModel;
    public  function __construct(){
        $this->loginView = new LoginView();
        $this->messageView = new MessageView();
        $this->sessionModel = new SessionModel();
    }
    public function showHead(){
        return $this->loginView->showHead();
    }
    public function showBody(){
        return $this->loginView->showBody();
    }
    public function showTitle(){
        return $this->loginView->showTitle();
    }

    public function login(){
        // if both are set this statement is true.

        if($this->loginView->GetUsername() &&  $password = $this->loginView->GetPassword() ){
            //var_dump($this->loginView->GetUsername());
            //var_dump($password);
            $userName = $this->loginView->GetUsername();
            $validate= New Validate();
            $isLoggedIn = $validate->check($userName,$password);
            $this->sessionModel->setLogin($isLoggedIn);
            return $isLoggedIn;
         }
        else if($this->messageView->userLoggedOut()){
            $this->sessionModel->logout();
        }
        return false;
    }
    public function checkLogin(){
        $this->login();

        $hasSession = $this->sessionModel->checkSession();
        if($hasSession ){
            $this->sessionModel->setToken();
            $this->messageView->setTokenValue($this->sessionModel->getToken());
            $obj = new stdClass();
            $obj->header= $this->messageView->showHead();
            $obj->title= $this->messageView->showTitle();
            $obj->body= $this->messageView->showBody();
            return $obj;
        }
        else{
            $obj = new stdClass();
            $obj->header= $this->loginView->showHead();
            $obj->title= $this->loginView->showTitle();
            $obj->body= $this->loginView->showBody();
            return $obj;
        }
    }
}
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-18
 * Time: 15:55
 */ 