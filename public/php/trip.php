<?php

include("connection.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $tripid = random_int(00000,99999);
    $tripname = $_POST['trip-name'];
    $startdate = date("Y-m-d",strtotime($_POST['start-date']));
    $enddate = date("Y-m-d",strtotime($_POST['end-date']));
    $type = isset($_POST['trip-type']) ? $_POST['trip-type'] : '';
    $source = $_POST['source'];
    $destination = $_POST['destination'];
    $email = $_POST['email'];

    try {
          $stmt=$pdo->prepare('Select * FROM register WHERE email = :email');
          $stmt->execute(['email'=> $email]);
          $user= $stmt->fetch();
          $userid = $user['userid'];

          $stmt2=$pdo->prepare('Select * FROM trip WHERE email = :email');
          $stmt2->execute(['email'=> $email]);
          $user2=$stmt->fetch();

          if($tripid==$user2['tripid'])
          {
             $tripid = random_int(00000,99999);
          } else  if ($stmt2->rowCount()>0 && $email==$user['email'])
          {   
            echo '<script>
                   alert("Trip Added Before");
                
                   </script>';
          } else if( $email==$user['email'])
          {
            $query = "INSERT INTO trip (tripid,userid,tripname,startdate,enddate,type,source,destination,email) VALUES (?,?,?,?,?,?,?,?,?)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$tripid,$userid,$tripname,$startdate,$enddate,$type,$source,$destination,$email]);
            echo '<script>
                   alert("Trip Added Successfully");
                
                   </script>';
          } else
          {
            echo '<script>
                   alert("Use Login email for Trip creation");
                
                   </script>';
          }
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }


}
?>