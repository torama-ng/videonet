Lesson 1 (nodejs):
1. In this lesson, we will use nodejs, express, ejs,bootstrap and layouts to 
produce a functional videonet with menus
2. Code folders will use express basic layout by invoking cmd 'express'
3. views will use easy to update layouts


Setup
npm install express-generator -g
npm install express-ejs-layouts --save
express --view=ejs <name_of_app>

Video Folders
folders under /videos should be odoo, python, javascript,css,express, nodejs,expressjs,html,bash,java

To run:
npm start

one view file (view.ejs) for all routes

Routes
Routes are setup in app.js. Each route gets a .js file in routes folder which calles views/view.ejs

mp4 File Listing
walk.js has a function walkSync that lists files in a given folder returning an array. The views loops the array to display the videos.

TODO
In future lessons, styling (css, flexbox), user management and search capabilities  will be introduced.