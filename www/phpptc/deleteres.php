<?php
 include "db.php";
 if(isset($_GET['id']))
 {
 $id=$_GET['id'];
 $q=mysqli_query($con,"delete from `apartados` where `id_apartado`='$id'");
 if($q)
 echo "success";
 else
 echo "error";
 }
 ?>