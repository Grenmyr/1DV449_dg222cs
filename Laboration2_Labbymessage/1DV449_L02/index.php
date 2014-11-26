<?php
require_once(__DIR__."/common/require.php");

$htmlView = new CommonHtml();

$LoginController = new LoginController();
//$body = $LoginController->showBody();
//$head = $LoginController->showHead();
//$title = $LoginController->showTitle();

$loginObj = $LoginController->checkLogin();
$htmlView->echoHTML($loginObj->body,$loginObj->header,$loginObj->title);
