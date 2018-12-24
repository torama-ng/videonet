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
// document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
document.getElementById("mySidebar").style.width = "0";
// document.getElementById("main").style.marginLeft= "0";
}

$(document).ready(jFunction);

function jFunction(){
  $('.jumbotron').click(function() {
    console.log("I am in jumbo click");
    closeNav();
  });
}

// SEARCH MENU

// Handlebars helper
Handlebars.registerHelper('substr', function(length, context, options) {
  if ( context.length > length ) {
   return context.substring(0, length) + "...";
  } else {
   return context;
  }
 });