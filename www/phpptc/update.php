<?php
 include "db.php";
      var_dump('hola');
    $id=$_POST['id'];
    $imagen=$_POST['imagen'];
    $producto=$_POST['producto'];
    $precio=$_POST['precio'];
    $cantidad=$_POST['cantidad'];
    $ingreso=$_POST['ingreso'];
    $caducidad=$_POST['caducidad'];
    $estado=$_POST['estado'];
    $categoria=$_POST['categoria'];
    $marca=$_POST['marca'];
    $pres=$_POST['pres'];
    $q=mysqli_query($con,"UPDATE `productos` SET productos.imagen_producto='$imagen', productos.nombre_producto='$producto', productos.precio='$precio',  productos.cantidad='$cantidad', productos.ingreso='$ingreso', productos.caducidad='$caducidad', productos.id_estado='$estado', productos.id_categoria='$categoria', productos.id_marca='$marca', productos.id_pres='$pres' WHERE id_producto = '$id'");
    if($q)
    echo "success";
    else
    echo "error";
    
 ?>