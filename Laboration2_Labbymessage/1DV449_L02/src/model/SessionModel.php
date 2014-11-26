<?php
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-24
 * Time: 14:36
 */

class SessionModel {

    public function __construct(){
        if(session_status() !== PHP_SESSION_ACTIVE){
            session_start();
        }
    }

    public function setToken()
    {
        $_SESSION['csrf'] = uniqid();
    }
    public function getToken()
    {
        if(isset($_SESSION['csrf'])){
            return $_SESSION['csrf'];
        }
        return false;
    }
    public function setLogin($isLoggedin){
        //$_SESSION['username'] = $username;
        $_SESSION['login'] = $isLoggedin;
    }

    public function isLoggedIn()
    {
        if(isset($_SESSION['login'])){
            return true;
        }
        return false;
    }

    public function logout()
    {
        if(isset($_SESSION['login'])){
            session_unset($_SESSION['login']);
        }
        //$_SERVER['HTTP_HOST'];
    }

    public function checkSession(){
        if(!isset($_SESSION['login'])) { return false; }
        return $_SESSION['login'];
    }

} 