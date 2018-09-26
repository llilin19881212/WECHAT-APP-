<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;
use \QCloud_WeApp_SDK\Constants as Constants;

class Upimgre extends CI_Controller {
    public function index() {


        // 处理文件上传
        $file = $_FILES['file']; // 去除 field 值为 file 的文件

        ini_set('upload_max_filesize', '10M');
        ini_set('post_max_size', '10M');

        // 限制文件格式，支持图片上传

            // 限制文件格式，支持图片上传
        if ($file['type'] !== 'image/jpeg' && $file['type'] !== 'image/png' && $file['type'] !== 'image/jpg') {
            $this->json([
                'code' => 1,
                'data' => '不支持的上传图片类型：' . $file['type']
            ]);
            return;
        }
        
        // 限制文件大小：5M 以内
        if ($file['size'] > 5 * 1024 * 1024) {
            $this->json([
                'code' => 1,
                'data' => '上传图片过大，仅支持 5M 以内的图片上传'
            ]);
            return;
        }
        
        $cosClient = Cos::getInstance();
        $cosConfig = Conf::getCos();
        $bucketName = $cosConfig['fileBucket'].'preview';
        $folderName = $cosConfig['uploadFolder'];
       
    $hostname_conn = "localhost";
    $database_conn = "cAuth";//自己建数据库名
    $username_conn = "root";
    $password_conn = "dEc23KrC";
    $artnum=$_POST['artnum'];
    $appid='wx3874ef0027a36124';//appid需自己提供，此处的appid我随机编写
    $secret='56cc5881e05aab100fe56c13e2e13da6';//secret需自己提供，此处的secret我随机编写
   // $code = $_GET['code'];//小程序传来的code值
   //$url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3874ef0027a36124&secret=56cc5881e05aab100fe56c13e2e13da6&js_code=' . $code . '&grant_type=authorization_code';
    //yourAppid为开发者appid.appSecret为开发者的appsecret,都可以从微信公众平台获取；
   // $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
   // $json = json_decode($info);//对json数据解码
   // $arr = get_object_vars($json);
   // $openid = $arr['openid'];
   // $session_key = $arr['session_key'];
    $conn = mysqli_connect($hostname_conn, $username_conn, $password_conn,$database_conn)or trigger_error(mysqli_error(),E_USER_ERROR);
 






 
      
        try {
            /**
             * 列出 bucket 列表
             * 检查要上传的 bucket 有没有创建
             * 若没有则创建
             */
            $bucketsDetail = $cosClient->listBuckets()->toArray()['Buckets'];
            $bucketNames = [];
            foreach ($bucketsDetail as $bucket) {
                array_push($bucketNames, explode('-', $bucket['Name'])[0]);
            }

            // 若不存在 bucket 就创建 bucket
            if (count($bucketNames) === 0 || !in_array($bucketName, $bucketNames)) {
                $cosClient->createBucket([
                    'Bucket' => $bucketName,
                    'ACL' => 'public-read'
                ])->toArray();
            }

            // 上传文件
            $fileFolder = $folderName ? $folderName . '/' : '';
            $fileKey =  $artnum;
            $uploadStatus = $cosClient->upload(
                $bucketName,
                $fileKey,
                file_get_contents($file['tmp_name'])
            )->toArray();

            $this->json([
                'code' => 0,
                'data' => [
                    'imgUrl' => $uploadStatus['ObjectURL'],
                    'size' => $file['size'],
                    'mimeType' => $file['type'],
                    'name' =>$artnum
                ]
            ]);
        } catch (Exception $e) {
            $this->json([
                'code' => 1,
                'error' => $e->__toString()
            ]);
        }
    }
}
