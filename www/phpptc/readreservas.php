<?php
include "db.php";
$data=array();
$q=mysqli_query($con,"SELECT a.id_apartado, c.nombre_cliente, p.nombre_producto, a.fecha_reserva, a.Cant FROM apartados a INNER JOIN cliente c USING (id_cliente) INNER JOIN productos p USING (id_producto) ORDER BY c.nombre_cliente");
while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
?>