<?php
use src\model\Repository;
require_once("Repository.php");
require_once("SessionModel.php");
class LongPoll {
    private $repository;


    // userTable parameters
    //used in messageTable also as parameter.
    private static $userName="username";
    private static $messageId ="idmessage" ;

    // MessageTable parameters
    private static $dbMessageTable ='labbymessage';
    private static $message = 'message';
    private static $timestamp = 'date';


    public function __construct(){
        $this->repository = new Repository();
        $this->init();
    }

    private function init()
    {
        $sessionModel = new SessionModel();
        if(!$sessionModel->isLoggedIn()) {
            $sessionModel->logout();
            return;}
        session_write_close();

        $mode = $this->fetch('mode');

        switch($mode){
            case 'get';
                $this->getMessages();
                break;
            case 'post':
                $this->setMessage();
                break;
            case 'remove':
                $this->removeMessage();
                break;
        }
        return;
        }


    private  function fetch($name){
        $val = '';
        if(isset($_POST[$name])){
            $val = $_POST[$name];
        }
        return $val;
    }

    protected function output($result, $output, $message = null, $latest = null){
        echo json_encode(array(
            'result' => $result,
            'message' => $message,
            'output' => $output,
            'latest' => $latest
        ));
    }


    public function getMessages(){
        $endTime = time() + 20;
        $lastTime = $this->fetch('lastTime');
        $curtime = null;

        while(time() <= $endTime){
            //try{
                $db = $this->repository->connect();
                $sql = "SELECT * FROM  " . self::$dbMessageTable." ORDER BY ". self::$timestamp ." DESC " ;
                $query = $db -> prepare($sql);
                $query->execute();
                $result = $query -> fetchAll();

                // time on last post in table.
                $curtime = strtotime($result[0]['date']);

                //If messages exist and currtime is not lasttime.
                if(!empty($result) && $curtime != $lastTime){
                    $this->output(true, "", array_reverse($result), $curtime);
                    break;
                }
                else{
                    sleep(1);
                }
           /* } catch (\PDOException $e) {
                throw new \Exception();
            }*/
        }

    }
    public function setMessage(){
        $sessionModel = new SessionModel();
        $sessionToken = $sessionModel->getToken();

        $username = $this->fetch('user');
        $message = $this->fetch('text');
        $token = $this->fetch('token');

        if($sessionToken !== $token) {return;}

        //try{
            $db = $this->repository->connect();
            $sql = "INSERT INTO  " . self::$dbMessageTable . "  (" . self::$message . ", " . self::$userName . ") VALUES (?, ?)";
            $params = array($message, $username);
            $query = $db -> prepare($sql);
            $result = $query -> execute($params);
            if($result){

            }
       /* } catch (\PDOException $e) {
            throw new \Exception();
        }*/
    }

    private function removeMessage()
    {
        // TODO fix here.
        $sessionModel = new SessionModel();
        $sessionToken = $sessionModel->getToken();


        $messageId = $this->fetch('idmessage');


        $token = $this->fetch('token');


        if($sessionToken !== $token) {return;}

      try{
            $db = $this->repository->connect();
            $sql = "DELETE  FROM   " . self::$dbMessageTable . " WHERE " . self::$messageId . " =  ?";
            $params = array($messageId);
            $query = $db -> prepare($sql);
            $result = $query -> execute($params);
            if($result){

            }
        } catch (\PDOException $e) {
            //throw new \Exception();
      }
    }
}

new LongPoll();