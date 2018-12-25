Lesson 4 (User Registration/Login/Profile Management):
In this lesson, we will improve on the Lessons 1 to 3 to:
1. create a login app or module and integrate with our videonet.
2. App must be able to register a user and then allow login securely
3. Use Passport-facebook and other social media plugins to register user
4. encrypt passwords with bcryptjs
5. Mongoose to manage mongodb interactions
6. Use mongodb
7. 

Prerequisite:
1. Understand Lesson 1, 2 and 3 properly (nodejs, express, ejs/handlebar, flexbox, html5)

Setup
Copy all files from Lesson 3 to this new folder

Video Folders
folders under /videos can be automatically created in softlink if need be

To run:
npm start or nodemon bin/www or forever start bin/www

Views:
one view file (view.ejs) for all routes

css
1. All styling css scripts to be in public/stylesheets folder and linked on header 
2. Just plain css but use html5's css flexbox.
3. Where necessary, We want to use bootstrap here

Routes
Routes are setup in routes directory  and included in app.js. This needs to change so routes are accessed with query-param or better way. DRY -> Dont Repeat Yourself. Most content of route files is similar.

Handlebars Helper:
This is weird, forcing us to require two handlebars - one express-handlebars and one handlebars with handle hbs.  Custom Handlebar helper defined in app.js. Is that the right time. THat file can get very big.

mp4 File Listing
walk.js has a function walkSync that lists files in a given folder returning an array. The views loops the array to display the videos.
*** We need to include recursive directory search

RESOURCES
1. https://youtu.be/yfoY53QXEnI - CSS Crash Course For Absolute Beginners
2. https://youtu.be/wpGNFGqNfdU - Responsive HTML & CSS Side Menu From Scratch
3. Traversy's User login with nodejs and Passport videos
4. Videos on Bootstrap and flexbox and mongoose
5.  will give detailed video references


mongodb://tor1:<dbpassword>@ds117109.mlab.com:17109/tordb1
mlab.com/torama/T0rM...o

TODO
1. reCaptcha on registration
2. If logged out, refreshing a route should provide login form without exiting route
3.
