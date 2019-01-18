 function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// SIDEBAR FUNCTION

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "200px";

  //Push the body away when menu button is clicked
  //document.getElementById("rec-video").style.marginRight = "50%";
  //document.getElementById("rec-body").style.marginRight = "50%";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  
  //alert('cool');
}


function getTexter(message){

  message = "Hello";
  return message;
}



function searchVideos() {

  var text = this.document.getElementById("input_text").value;
  if(text !== null){
    //alert(text);

    document.write('Searched Videos'.link('http://localhost:3000/'));
    
  }
  else{
    alert('Type please');
  }
}


function playVideo(selectid) {
  let video = "";
  
  video = document.getElementById('videoid');
  
  let videotext = document.getElementById('videotitle');
  // pick the id element of the select tag as folder
  let folder = document.querySelector('select').id;
  // console.log(`x is ${x.id}`);
  
  let selected = selectid.value;
 
  videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
  selected = '/' + folder + '/' + selected;
  // console.log(`select id is ${selectid} selected is ${selected}`);
  // set text for video Title
  console.log(`selected id is ${selected} `); 
  // var source = document.createElement('source');
  
  //source.setAttribute('src', selected);
  
  // video.appendChild(source);
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
  // pick the id element of the select tag as folder
  let folder = document.querySelector('h5').id;
  // console.log(`x is ${x.id}`);
  
  let selected = selectid;
  
  videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
  selected = '/' + folder + '/' + selected;
  // console.log(`select id is ${selectid} selected is ${selected}`);
  // set text for video Title
 // console.log(`selected url is ${selected} `); 
  var source = document.createElement('source');
  
  //source.setAttribute('src', encodeURI(selected));
  
  //video.appendChild(source);
  video.src = encodeURI(selected);
 
  video.load();
  
  // document.getElementById(selectid).onclick = function(){
  video.play();
  let dur = video.duration;
  document.getElementById('vid-0').textContent = (dur/60).toFixed(0) + " mins";
  document.getElementById('videoid').focus();
  // console.log(`current video src is ${video.currentSrc}`);
  
  // }
  
}



module.exports = Logger;


// SEARCH MENU

