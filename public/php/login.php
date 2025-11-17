<?php
  session_start();

 if($_SERVER["REQUEST_METHOD"] == "POST") {
    $email=$_POST['email'];
    $password = $_POST['pass'];
    
    include("connection.php");
    $stmt=$pdo->prepare('Select * FROM user WHERE email = :email');
    try 
    {
        $stmt->execute(['email'=> $email]);
        if($stmt->rowCount()>0)
        {   
            $user = $stmt->fetch();
            if($password==$user['password'])
            {
              echo "<script>
                    alert('Login Sucessfull!'');
                    </script>";
                    header("Location: /econotourist/mainloginedin.html?userid={$user['userid']}");
                    exit();
                    
            }
            else 
            {
                $_SERVER['email'] = $email;
                $_SERVER['password'] = $password;
                echo '<script>
                       alert("Incorect Password");
                       window.location.href="/econotourist/index.html";
                       </script>';

            }
        }
        else
        {
            $_SERVER['email'] = $email;
            $_SERVER['password'] = $password;
            echo '<script>
                   alert("No account associated with his email");
                   window.location.href="/econotourist/index.html";
                  </script>';

        } 
    } 
    catch(PDOException $e)
    {
        echo "Error: " . $e->getMessage();
    }
}
?>
