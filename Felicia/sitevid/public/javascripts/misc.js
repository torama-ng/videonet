// Set Video Duration in proper place

function setDuration(indx) {  
 // var vidTag = document.querySelectorAll('video');
  // vidTag.forEach((val,index) => {
      
  var dur = document.getElementById('video-'+ indx).duration;
  duration = (dur/60).toFixed(2);
  
  document.getElementById('vid-'+ indx).textContent = duration + " mins";

    //});
}

// Handlebars helperS
// substr to decorate string
