<?php

if(isset($_POST['data'])){
    if($_POST['data']== 'getJson'){
        $json = file_get_contents('house.json');
        echo $json;
    }    
    if($_POST['data']== 'saveJson'){
        $json = json_decode(file_get_contents('house.json'), true);
        echo '<pre>';
        // print_r( $json->$_POST['house']);
        array_push($json[$_POST['house']]['list'],$_POST['id']);
        $json = json_encode($json);
        print_r( $json);
        $myfile = fopen("house.json", "w") or die("Unable to open file!");
        fwrite($myfile, $json);
        fclose($myfile);
    }



}
if(isset($_GET['reset'])){
    $myfile = fopen("house.json", "w") or die("Unable to open file!");
    $json = '{
    "java": {
        "list": []
    },
    "kotlin": {
        "list": []
    },
    "cobol": {
        "list": []
    },
    "python": {
        "list": []
    }
}';
    fwrite($myfile, $json);
    fclose($myfile);
    header('Location: ./');
}