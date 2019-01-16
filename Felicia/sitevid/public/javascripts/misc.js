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

//tooltip

$(document).on('mouseenter', "p", function () {
  var $this = $(this);
  if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
      $this.tooltip({
          title: $this.text(),
          placement: "bottom"
      });
      $this.tooltip('show');
  }
});
$('.card-text').css('width',$('.card-text').parent().width());

