<?php
    include "../db.php";
    if(isset($_GET['action'])){
        $result = array('status'=>0,'exception'=>'');
        $data=array();
        switch($_GET['action']){
            case 'LeerEstado':

            $q=mysqli_query($con,"SELECT * from estado");
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
            case 'LeerCategoria':

            $q=mysqli_query($con,"SELECT * from categorias");
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
            case 'LeerMarca':

            $q=mysqli_query($con,"SELECT * from marca");
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
            case 'LeerPres':

            $q=mysqli_query($con,"SELECT * from presentaciones");
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
            $q=mysqli_query($con,'SELECT * from productos WHERE id_producto = '.$_POST['id_producto'].'');
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