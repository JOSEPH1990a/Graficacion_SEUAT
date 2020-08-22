<?php
require_once "../Model/config.php";
header('Content-Type: text/html; charset=utf-8');
$fecha1 = "";
$fecha2 = "";
$insignias = [];
    //echo "<script>console.log('Debug Objects: " . $datTotal['cuantas'] . "' );</script>";

if ($_REQUEST['cod']==1){
    $sql = "SELECT correo, duracion FROM c_registros";
    $query_exec = $link->query($sql);
    if(mysqli_num_rows($query_exec)){
        while($row=mysqli_fetch_row($query_exec)){
            $usuario = $row[0];
            $duracion = $row[1];
            if(!array_key_exists($usuario,$insignias)){
                $insignias[$usuario] = $duracion;
                }
            else{
                $insignias[$usuario] += $duracion;
                }  
            }
        }
    //arsort($insignias);
    var_dump( $insignias);
}
if ($_REQUEST['cod']==2){
    $sql = "SELECT correo, duracion FROM c_registros";
    $query_exec = $link->query($sql);
    if(mysqli_num_rows($query_exec)){
        while($row=mysqli_fetch_row($query_exec)){
            $usuario = $row[0];
            $duracion = $row[1];
            if(!array_key_exists($usuario,$insignias)){
                $insignias[$usuario]= $duracion;
                }
            else{
                $insignias[$usuario]+= $duracion;
                }  
            }
        }
    //arsort($insignias);
    header('Content-Type: application/json; charset=utf-8');
    //echo json_decode($insignias);
    arsort($insignias);
    echo json_encode($insignias, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
}
?>