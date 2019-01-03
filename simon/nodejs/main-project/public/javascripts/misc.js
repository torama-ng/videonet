


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



