Lesson 2 (node app):
In this lesson, we will improve on the Lesson 1 to:
1. Use native css to style the nav menus to be both desktop and mobile friendy.
2. Use css to style the video area to work in mobile and desktop platforms

Prerequisite:
1. Understand Lesson 1 properly (nodejs, express, ejs)

Setup
Copy all files from Lesson 1 and delete php folder and rename nodejs folder to node
from node folder, do "npm start" to start the server

Video Folders
folders under /videos should be odoo, python, javascript,css,express, nodejs,expressjs,html,bash,java

To run:
cd node && npm start

Views:
one view file (view.ejs) for all routes

css
1. All styling css scripts to be in public/stylesheets folder and linked on header 
2. Just plain css but use html5's css grid. no flexbox or other libraries
3. Where necessary, decouple from bootstrap to show power of native css

Routes
Routes are setup in app.js. Each route gets a .js file in routes folder which calles views/view.ejs

mp4 File Listing
walk.js has a function walkSync that lists files in a given folder returning an array. The views loops the array to display the videos.

RESOURCES
1. https://youtu.be/yfoY53QXEnI - CSS Crash Course For Absolute Beginners
2. https://youtu.be/wpGNFGqNfdU - Responsive HTML & CSS Side Menu From Scratch

TODO
