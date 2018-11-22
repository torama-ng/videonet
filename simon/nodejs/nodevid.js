var fs = require('fs');
let title = "Torama Video Portal";
let header = "<html><head>"+ title + "</head><body><h1>Welcome to Torama Video Portal </h1>";
let footer = "<p> Copyright @ Torama </p>" + "</body></html>";

let videotag = '<video width="200" height="200"  controls><source src="';
let endvideotag = '" type="video/mp4"> </video>';
let coltag = "<td>";
let endcoltag = "</td>";

function readAll(f) {
     fs.readdir(f, function(err, items) {
        console.log(f);
        console.log("<table border='1'><tr>");
        for (var i=0; i<items.length; i++) {
            console.log(coltag+videotag + items[i] + endvideotag + endcoltag);
      
        } 
        console.log("</tr></table >");
    });
};
console.log(header);
readAll('videos/odoo');
readAll('videos/javascript');
readAll('videos/python');
readAll('videos/django');
readAll('videos/git');
readAll('videos/vscode');
console.log( footer);
