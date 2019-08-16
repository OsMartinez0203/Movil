<?php
 include "db.php";
 if(isset($_POST['id']))
 {
 $id=$_POST['id'];
 $q=mysqli_query($con,"delete from `productos` where `id_producto`='$id'");
 if($q)
 echo "success";
 else
 echo "error";
 }
 ?>