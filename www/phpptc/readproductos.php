<?php
include "db.php";
$data=array();
$q=mysqli_query($con,"SELECT p.id_producto, c.nombre_cat, p.nombre_producto, p.caducidad, p.precio, e.estado, m.nombre_marca, s.presentacion FROM productos p INNER JOIN categorias c USING(Id_categoria) INNER JOIN estado e USING(Id_estado) INNER JOIN marca m USING(Id_marca) INNER JOIN presentaciones s USING(id_pres) ORDER BY nombre_producto");
while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
?>