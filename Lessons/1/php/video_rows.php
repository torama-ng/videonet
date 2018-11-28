<?php

function videoRows($dir) {
  echo "<p> ".strtoupper($dir)."</p>";
  $dir = "videos/" . $dir;
  $video_files = glob($dir.'/*.*');
  $dir_len = sizeof($video_files);
  for ($x=1; $x<=($dir_len/4)+1; $x++){
   echo "<p class='bg-success'> Row ". $x. "</p>";
   echo "<div class='row' >" ; 

   for ($y=1; $y<=4; $y++){
      $video = array_shift($video_files);
      if ($video){
        $ext = pathinfo($video, PATHINFO_EXTENSION);
        $dotext = "." . $ext;
        $base_name = basename($video,$dotext);
        
        echo "<div class='col'>";
        echo "<p class='text-white-50 bg-dark'>";
        echo substr($base_name,0,25) ."</p>";
        echo "<video width='200' controls>";
        echo "<source src='". $video ."' type='video/" . $ext ."'>";
        echo "</video><br/>";
        
        echo "</div>";
        
      }   
    }
    echo "</div> <br /> <hr>"; // End of row div
    }
  }
?>
