<?php
    include "../db.php";
    if(isset($_GET['action'])){
        $result = array('status'=>0,'exception'=>'');
        $data=array();
        switch($_GET['action']){
            case 'fechaLinea':
            $q=mysqli_query($con,"SELECT COUNT(apartados.id_apartado) cantidad, fecha_reserva from apartados GROUP BY fecha_reserva");
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