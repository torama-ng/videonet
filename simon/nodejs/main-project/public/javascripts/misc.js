


// SIDEBAR FUNCTION

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "200px";

}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  
  //alert('cool');
}








const EventEmitter = require('events');

class Logger extends EventEmitter{
  
  log(message){

    this.emit('textReceived',{data:1,name:'King'});
    
  }
}

function setDuration(indx) {  
 
       
   var dur = document.getElementById('video-'+ indx).duration;
   duration = (dur/60).toFixed(2);
   
   document.getElementById('vid-'+ indx).textContent = duration + " mins";
 
 }
 
 function playVideo(selectid) {
   let video = "";
   
   video = document.getElementById('videoid');
   
   let videotext = document.getElementById('videotitle');
   let folder = document.querySelector('select').id;
   
   let selected = selectid.value;
  
   videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
   selected = '/' + folder + '/' + selected;
  
   console.log(`selected id is ${selected} `); 
 
   video.src = selected;
  
   video.load();
   
   // document.getElementById(selectid).onclick = function(){
   video.play();
   let dur = video.duration;
   document.getElementById('vid-0').textContent = (dur/60).toFixed(0) + " mins";
   
   console.log(`current video url is ${video.currentSrc}`);
   // }
   
 }
 
 
 function playcVideo(selectid) {
   let video = "";
   console.log(`play value is ${selectid}`);
 
   video = document.getElementById('videoid');
   
   let videotext = document.getElementById('videotitle');
   let folder = document.querySelector('h5').id;
   
   let selected = selectid;
   
   videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
   selected = '/' + folder + '/' + selected;
 
   var source = document.createElement('source');
   
 
   video.src = encodeURI(selected);
  
   video.load();
   

   video.play();
   let dur = video.duration;
   document.getElementById('vid-0').textContent = (dur/60).toFixed(0) + " mins";
   document.getElementById('videoid').focus();
  
 }
 

