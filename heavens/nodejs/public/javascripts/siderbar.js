var c =0;
  function openNav() {
    c++
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("main").style.marginLeft = "0px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
    if(c%2==0) {
      document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    }
  }