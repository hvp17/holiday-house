<?php
require_once __DIR__.'/db.php';
try{

}catch(PDOException $e){
    echo '{"status":0, "message":"error"}';
}