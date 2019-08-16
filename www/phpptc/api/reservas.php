<?php
    include "../db.php";
    if(isset($_GET['action'])){
        $result = array('status'=>0,'exception'=>'');
        $data=array();
        switch($_GET['action']){
            case 'LeerCliente':

            $q=mysqli_query($con,"SELECT * from cliente");
            if(mysqli_num_rows($q)>0){
                while($row = mysqli_fetch_assoc($q)){
                    $result['dataset'][]=$row;
                }
                $result['status']=1;
            }
            else{
                $result['exception']='No hay resultados';
            }
            $result['status']=1;
            break;
            case 'LeerProducto':

            $q=mysqli_query($con,"SELECT * from productos");
            if(mysqli_num_rows($q)>0){
                while($row = mysqli_fetch_assoc($q)){
                    $result['dataset'][]=$row;
                }
                $result['status']=1;
            }
            else{
                $result['exception']='No hay resultados';
            }
            $result['status']=1;
            break;
        }
        print json_encode($result);
    }
    else{
        exit("Petición rechazada");
    }

?>