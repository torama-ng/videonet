<?php

function torvid($dir){
	# $dir contains all videos in the dir
	#
	#
  echo '<h4>' . $dir.strtoupper(). '</h4>'; 
  echo '<div class="row">';
  $dir = 'videos/' . $dir;
  $video_files = glob($dir.'/*.mp4');
  $dir_len = sizeof($video_files);
  for ($k=1; $k<= $dir_len;$k++){
     $video = array_shift($video_files);
     $basename = basename($video);
       echo '<div class="col" style="background-color:lavender;"><p>'. substr($basename,0,15) .' </p>';
   echo '<div><video width="200" height="200"  controls>';
   echo '<source src="' . $video .'" type="video/mp4">';
   echo 'Your browser does not support the video tag. </video></div>';
   echo "</div>";
 }
   echo "</div>";
}
?>
