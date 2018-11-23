
var http = require('http'),
fs = require('fs');

let path = './Odoo10/';


let title = "Torama Video Portal";
let head = "<html><head>"+ title + "</head><body><h1>Welcome to Torama Video Portal </h1>";
let body = "<p> Copyright @ Torama </p>" + "</body></html>";
  
  
function onReqeust(request, response) {  
        response.writeHeader(206, {'Content-Type': 'text/html'});
        
        let i;
        
        
       let all_files =  fs.readdir(path, function(err, items) {

        response.write(head);
        


            for ( i=0; i<items.length; i++) {
               response.write(items[i] + '<br>')
               response.write('<video Content-Type:"video/mp4" source src=\''+items[i]+' <></video>');
              
            } 
            response.write(body);
           
        });   
         
}

http.createServer(onReqeust).listen(8000);
console.log("server is running");


   


     
   
