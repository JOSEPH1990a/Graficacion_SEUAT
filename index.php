<?php
// Inicializar Sesion
//session_start();
 
// Checar si el usuario ya inició sesion, en caso afirmativo redirigir a Dashboard.html
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: View/dashboard.php");
    exit;
}
 
// Incluir el archivo de configuracion
require_once "Model/config.php";
 
// Definir variables e inicializar con valores vacíos
$username = $password = "";
$username_err = $password_err = "";
 
// Procesar Datos del Formulario cuando envía el Formulario
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Comprobar si el nombre de usuario esta vacío
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Checar si la contraseña no esta vacía
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validar Credenciales
    if(empty($username_err) && empty($password_err)){
        // Prepare una declaracion de seleccion (CONSULTA)
        $sql = "SELECT id, username, password FROM c_users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Vincula las varibles a la declaracion preparda como parametros
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Estblecer parametros
            $param_username = $username;
            
            // Intenta ejecutar la declarcion preparda
            if(mysqli_stmt_execute($stmt)){
                // Alm
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            header("location: View/dashboard.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "Contraseña invalida";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No existe una cuenta con ese usuario.";
                }
            } else{
                echo "Oops! Intenta mas tarde";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Graficación SEUAT</title>
    <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="src/plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="src/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="src/dist/css/adminlte.min.css">
</head>
<body class="hold-transition login-page">
    <div class=login-box>
        <div class="login-logo">
            <img src="src/img/logo.png" style= "width:200px">
            <a href="#"><b>Graficacion</b>SEUAT</a>
        </div>
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Por favor, ingresa tu correo y contraseña para entrar</p>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                    <div class="input-group mb-3 form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                        <input type="text" name="username" class="form-control" placeholder="Correo" value="<?php echo $username; ?>">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"><?php echo $username_err; ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3 form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                        <input type="password" class="form-control" name="password" placeholder="Contraseña">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"><?php echo $password_err; ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                Recuerdame
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>