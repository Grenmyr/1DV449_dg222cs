<?php
/**
 * Created by PhpStorm.
 * User: dav
 * Date: 2014-11-19
 * Time: 09:40
 */

namespace src\model;


class Repository {
    //local
    private  static $DB_USERNAME = "root";
    private  static $DB_PASSWORD = '';
    //pub
    private  static $PUBLISHEDDB_USERNAME = "dgrenmyr_nu";
    private  static $PUBLISHEDDB_PASSWORD = 'bytt lösen';

    //local
    private  static $DB_HOST = '127.0.0.1';
    private  static $DB_NAME = 'logindb';
    //pub
    private  static $PUBLISHEDDB_HOST = 'dgrenmyr.nu.mysql';
    private  static $PUBLISHEDDB_NAME = 'dgrenmyr_nu';


    private  static $dbConnstring;
    private  static $connection;

    public function __construct(){
        self::$dbConnstring = 'mysql:host='. self::$DB_HOST.';dbname='. self::$DB_NAME;
        //self::$dbConnstring = 'mysql:host='. self::$PUBLISHEDDB_HOST.';dbname='. self::$PUBLISHEDDB_NAME;


    }

    public function connect(){
      if(self::$connection == null){
            self::$connection = new \PDO(self::$dbConnstring,self::$DB_USERNAME,self::$DB_PASSWORD);
            self::$connection->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
       }


        //pub
      /* if(self::$connection == null){
            self::$connection = new \PDO(self::$dbConnstring,self::$PUBLISHEDDB_USERNAME,self::$PUBLISHEDDB_PASSWORD);
            self::$connection->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);

        }*/
        return self::$connection;
    }








} 