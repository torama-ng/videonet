// Set Video Duration in proper place

function setDuration() {  
  var vidTag = document.querySelectorAll('video');
  vidTag.forEach((val,index) => {
      
      var dur = document.getElementById('video-'+ index).duration;
      duration = (dur/60).toFixed(2);
      
      document.getElementById('vid-'+ index).textContent = duration + " mins";

    });
}
 
// test

// SIDEBAR FUNCTION

// SEARCH MENU

// Handlebars helper
/*
Handlebars.registerHelper('substr', function(length, context, options) {
  if ( context.length > length ) {
   return context.substring(0, length);
  } else {
   return context;
  }
 });
 */