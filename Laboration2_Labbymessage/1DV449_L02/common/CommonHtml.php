<?php
class CommonHtml {
public function echoHTML($body,$head,$title){
if($body === null){
throw new \Exception("HTML is Null");
}
echo"
<!DOCTYPE html>
<html>
<head>
    $head
   <title>$title</title>
    <meta charset='utf-8'/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content=''>
    <meta name='author' content=''>


</head>
<body>
<div class='content'>
    $body
</div>
</body>
</html>";
}
}
