<?php
 echo " <p class='bg-warning'>Welcome to Torama Videos in php</p>";
?>
<!DOCTYPE html>

<html lang="en">

<head>

  <title>Torama Video App (php) </title>

  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>

  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

</head>

<body>


<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand/logo -->
  <a class="navbar-brand" href="#">
    <img src="img/logo.png" alt="logo" style="width:40px;">
  </a>
  
  <!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Bash Programming</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?html=true">HTML</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?linux=true">Linux</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?javascript=true">javascript</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?nodejs=true">Nodejs</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="?odoo=true">Odoo</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?python=true">Python</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="?java=true">Java</a>
    </li>
  </ul>
</nav>


<div class="container-fluid">

  <h1>TORAMA INTERNAL VIDEOS</h1>
<?php
 include_once "video_rows.php";
 if (isset($_GET['odoo'])) {videoRows("odoo"); }
 if (isset($_GET['javascript'])) { videoRows("javascript"); } 
 if (isset($_GET['python'])){videoRows("python");}
 if (isset($_GET['linux'])){videoRows("linux");}
 if (isset($_GET['java'])){videoRows("java");}
 if (isset($_GET['nodejs'])){videoRows("nodejs");}
 if (isset($_GET['html'])){videoRows("html");}
?>
</div> <!--  end of Container div -->

</body>
</html>
