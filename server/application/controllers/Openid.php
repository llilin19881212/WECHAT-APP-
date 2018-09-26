
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class openid extends CI_Controller {
public function index() 
{   $appid='wx3874ef0027a36124';//appid需自己提供，此处的appid我随机编写
    $secret='56cc5881e05aab100fe56c13e2e13da6';//secret需自己提供，此处的secret我随机编写
    $code = $_GET['code'];//小程序传来的code值
    $nick = $_GET['nick'];//小程序传来的用户昵称
    $imgUrl = $_GET['avaurl'];//小程序传来的用户头像地址
    $sex = $_GET['sex'];//小程序传来的用户性别
   $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3874ef0027a36124&secret=56cc5881e05aab100fe56c13e2e13da6&js_code=' . $code . '&grant_type=authorization_code';
    //yourAppid为开发者appid.appSecret为开发者的appsecret,都可以从微信公众平台获取；
    $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
    $json = json_decode($info);//对json数据解码
    $arr = get_object_vars($json);
    $openid = $arr['openid'];
    //$openid = $_GET['id'];
    $session_key = $arr['session_key'];
    $hostname_conn = "localhost";
    $database_conn = "cAuth";//自己建数据库名
    $username_conn = "root";
    $password_conn = "dEc23KrC";
    $cash=0;
    $zan=0;
    $id='';
     $nyear= date('Y');
    $nmonth= date('m');
    $nday=date('d');
    $year= 0;
    $month= 0;
    $day= 0;
   
        $conn = mysqli_connect($hostname_conn, $username_conn, $password_conn,$database_conn)or trigger_error(mysqli_error(),E_USER_ERROR);

    if(!$conn){
        
        echo "连接不成功！";  
    }

$sql = " SELECT MAX(id) FROM  `user`";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  
$id=$row[0]+1;

}
}else{
    echo "query failed";
}	;





$sql = "  SELECT SEX FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  $sex= $row[0];
 
 
}
}else{
   $sql = "INSERT INTO user (openid,sex,nick,headimage,id,cash,logyear,logmonth,logday,zan,pro,author,level)
VALUES ( '$openid', '$sex', '$nick','$imgUrl','$id','100','0','0','0','0','0','$nick','1')";
if ($conn->query($sql) === TRUE) {
    
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
};
}      




  $sql = "  SELECT logyear FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  $year= $row[0];

 
}
}else{
    echo "query failed";
}

$sql = "  SELECT logmonth FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){

  $month= $row[0];
 
}
 }else{
    echo "query failed";
}


$sql = "  SELECT logday FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  
  $day= $row[0];
   
}
}else{
    echo "query failed";
}







$sql = "  SELECT cash FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  $cash= $row[0];
 
 
}
}else{
    echo "query failed";
}      

$sql = "  SELECT zan FROM `user`WHERE openid='$openid'";
mysqli_query($conn, "set id 'utf8'");
$result = mysqli_query($conn, $sql);

$result= $conn->query($sql);
   
 if($result->num_rows >0){
    while($row=$result->fetch_row()){
  $zan= $row[0];
 
 
}
}else{
    echo "query failed";
}   




if($nyear>$year){
  $sql = "UPDATE `user` SET `logyear`='$nyear' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
    $sql = "UPDATE `user` SET `logmonth`='$nmonth' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
    $sql = "UPDATE `user` SET `logday`='$nday' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
   $cash=$cash+100;
   $rs=[0];
   //echo 'yearout';
}else{
  if($nmonth>$month){
   
   $sql = "UPDATE `user` SET `logmonth`='$nmonth' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
    $sql = "UPDATE `user` SET `logday`='$nday' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
   $rs=[0];
    $cash=$cash+100;
      ////echo 'monthout';
  }else{
   if($nday>$day ){
   $sql = "UPDATE `user` SET `logday`='$nday' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
   $cash=$cash+100;
   $rs=[0]; 

     //echo 'd1out';
      }
  }
}


 $sql = "UPDATE `user` SET `cash`='$cash' WHERE `openid`='$openid' ";
   mysqli_query($conn, "set id 'utf8'");
   $result = mysqli_query($conn, $sql);
   $result= $conn->query($sql);
   
 


$rs=array($cash,$zan);

$rs=json_encode($rs);
exit($rs);
$conn->close();
    
  
}

}

?>
