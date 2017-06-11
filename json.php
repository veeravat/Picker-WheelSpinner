<?php

if(isset($_POST['data'])){
    if($_POST['data']== 'getJson'){
        $json = file_get_contents('house.json');
        echo $json;
    }

}