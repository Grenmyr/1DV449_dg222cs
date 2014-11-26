<?php
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-18
 * Time: 19:04
 */

namespace src\model;


class Validate {
    private $repository;

    // userTable parameters
    private static $dbUserTable ='user';
    //used in messageTable also as parameter.
    private static $userName="username";
    private static $password="password";

    // MessageTable parameters
    private static $dbMessageTable ='labbymessage';
    private static $labbyMessage = 'labbymessage';

    public function __construct(){
        $this->repository = new Repository();
    }

    public function check($username, $password){

        $dbPassword = $this->getPasswordByUserName($username);

        if( password_verify($password, $dbPassword)){
            return true;
        }
            return false;
    }


    public function getPasswordByUserName($userName){

       try{
            $db = $this->repository->connect();
            $sql = "SELECT *  FROM " . self::$dbUserTable . " WHERE " . self::$userName . " = ?";
            $params = array($userName);
            $query = $db -> prepare($sql);
            $query -> execute($params);
            $result = $query -> fetch();
            if($result){
                return $result[self::$password];
            }
            else{
                return null;
            }
        }
        catch(\PDOException $e) {
            die("database error");
            throw new \Exception();
        }

    }

    public function checkSession(){
        if(!isset($_SESSION['login'])) { return false; }
        return $_SESSION['login'];
    }

   /* public function setMessages($message,$username){

        try{
            $db = $this->repository->connect();
            $sql = "INSERT INTO  " . self::$dbMessageTable . "  (" . self::$labbyMessage . ", " . self::$userName . ") VALUES (?, ?)";
            $params = array($message, $username);
            $query = $db -> prepare($sql);
            $result = $query -> execute($params);
            if($result){

            }
        } catch (\PDOException $e) {
            throw new \Exception();
        }
    }

    public function getMessages(){
        try{
            $db = $this->repository->connect();
            $sql = "SELECT * FROM  " . self::$dbMessageTable."" ;
            $query = $db -> prepare($sql);
            $result = $query -> fetch();

            if($result){
                return $result;
            }
        } catch (\PDOException $e) {
            throw new \Exception();
        }

    }*/
} 