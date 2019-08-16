<?php    
    include "db.php";
    if(isset($_POST['insert']))
    {
        $imagen = $_POST['imagen'];
        $producto = $_POST['producto'];
        $precio = $_POST['precio'];
        $cantidad = $_POST['cantidad'];
        $ingreso = $_POST['ingreso'];
        $caducidad = $_POST['caducidad'];
        $estado = $_POST['estado'];
        $categoria = $_POST['categoria'];
        $marca = $_POST['marca'];
        $pres = $_POST['pres'];
        $q = mysqli_query($con, "INSERT INTO `productos`(`imagen_producto`, `nombre_producto`, `precio`, `cantidad`, `ingreso`, `caducidad`, `id_estado`, `id_categoria`, `id_marca`, `id_pres`) VALUES ('$imagen', '$producto', '$precio', '$cantidad', '$ingreso', '$caducidad', '$estado', '$categoria', '$marca', '$pres')");
        if($q)
            echo "success";
        else
            echo "error";
    }
 ?>