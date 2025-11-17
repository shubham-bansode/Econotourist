<?php

session_start();
 include ("connection.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $fname = isset($_POST['fname']) ? trim($_POST['fname']) : '';
    $lname = isset($_POST['lname']) ? trim($_POST['lname']) : '';
    $age   = $_POST['age'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $dob = date("Y-m-d", strtotime($_POST['dob']));
    $gender = isset($_POST['gender']) ? $_POST['gender'] : '';
    $phoneno = $_POST['phone_no'];

    try {
          $stmt=$pdo->prepare('Select * FROM user WHERE email = :email');
          $stmt->execute(['email'=> $email]);
          $user = $stmt->fetch();
          
          $stmt2=$pdo->prepare('Select * FROM register WHERE email = :email');
          $stmt2->execute(['email'=> $email]);
          $user2=$stmt->fetch();

           if($stmt2->rowCount()>0 && $email==$user['email'])
          {
            echo '<script>
                   alert("Registered");
                
                   </script>';
          } else if($email==$user['email'])
          {
            $userid = $user['userid'];
            $query = "INSERT INTO register (userid,f_name,l_name,age,email,password,dob,gender,phone_no) VALUES (?,?,?,?,?,?,?,?,?)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$userid,$fname,$lname,$age,$email,$password,$dob,$gender,$phoneno]);
            echo '<script>
                   alert("Registered");
                
                   </script>';
        }else 
        {
            echo '<script>
                   alert("Use Login email for Registration");
                
                   </script>';

        }
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

}
?>