
var http = require('http'),
fs = require('fs');

let path = './Odoo10/';


let title = "Torama Video Portal";
let head = "<html><head>"+ title + 
'<meta charset="utf-8">'+

'<meta name="viewport" content="width=device-width, initial-scale=1">'+

'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">'+

'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'+

'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>'+

'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>'+
'"</head><body>'+
'<h1>Welcome to Torama Video Portal </h1>"';
let navBar = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">'+
'<!-- Brand/logo -->'+
'<a class="navbar-brand" href="#">'+
  '<img src="img/logo.png" alt="logo" style="width:40px;">'+
'</a>'+

'<!-- Links -->'+
'<ul class="navbar-nav">'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="#">Bash Programming</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?html=true">HTML</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?linux=true">Linux</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?javascript=true">javascript</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?nodejs=true">Nodejs</a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="?odoo=true">Odoo</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?python=true">Python</a>'+
  '</li>'+
  '<li class="nav-item">'+
  '<a class="nav-link" href="?java=true">Java</a>'+
  '</li>'+
'</ul>'+
'</nav>';
let body = "<p> Copyright @ Torama </p>" + "</body></html>";
let videotag = '<video width="200" height="200"  controls src="';
let endvideotag = '" type="video/mp4"> </video>';
let coltag = "<td>";
let endcoltag = "</td>";
  
  
function onReqeust(request, response) {  
        response.writeHeader(200, {'Content-Type': 'text/html'});
        
       let all_files =  fs.readdir(path, function(err, items) {

        // Head and navigation bar should be to display on response
        response.write(head+navBar);
       

   // Table to hold video tag  
        response.write("");

        
            for ( i=0; i<items.length; i++) {
              
               response.write(items[i] +"<br/>" );


               response.write(coltag+videotag+items[i]+endvideotag+endcoltag); 
                   
            } 
            response.write(body);
           
        });   
         
}

http.createServer(onReqeust).listen(8000);
console.log("server is running");


   


     
   
