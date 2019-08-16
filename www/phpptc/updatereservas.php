<?php
    include "db.php";
    if(isset($_POST['update']))
    {
    $id_apartado=$_POST['id_apartado'];
    $cliente=$_POST['cliente'];
    $producto=$_POST['producto'];
    $fecha=$_POST['fecha'];
    $cantidad=$_POST['cantidad'];
    $q=mysqli_query($con,"UPDATE `apartados` SET `id_cliente`='$cliente',`id_producto`='$producto',`fecha_reserva`='$fecha', `Cant`='$cantidad' where `id_apartado`='$id_apartado'");
    if($q)
    echo "success";
    else
    echo "error";
    }
 ?>