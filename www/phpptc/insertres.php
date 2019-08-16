<?php
    include "db.php";
    if(isset($_POST['insert']))
    {
        $fecha = $_POST['fecha'];
        $cliente = $_POST['cliente'];
        $producto = $_POST['producto'];
        $cantidad = $_POST['cantidad'];
        $q = mysqli_query($con, "INSERT INTO `apartados`(`fecha_reserva`, `id_cliente`, `id_producto`, `Cant`) VALUES ('$fecha', '$cliente', '$producto', '$cantidad')");
        if($q)
            echo "success";
        else
            echo "error";
    }
 ?>