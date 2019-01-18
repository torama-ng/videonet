const fs = require('fs');
//var ffmpeg = require('fluent-ffmpeg');
var ffmpeg = require('ffmpeg');
var path = require('path');

//app.use(express.static(path.join(__dirname, 'ffmpeg')));

// ffmpeg.setFfmpegPath(path.join(__dirname, 'ffmpeg/bin/ffmpeg.exe'));
// ffmpeg.setFfprobePath(path.join(__dirname, 'ffmpeg/bin/ffprobe.exe'));

var findVideos = function (dir, fileList) {

    fileList = fileList || [];
    fs.readdir(dir, function (error, files) {

        if (error) throw error;
        files.forEach(function (fileElements) {
            //var innerPath = path.join(dir,'/',fileElements); 

            fs.readdir(dir + '/' + fileElements, function (error2, videoFiles) {

                if (error) throw error2;

                videoFiles.forEach(video => {
                    //if (!fs.statSync(fileElements+'/'+video).isDirectory()) {
                    //File list is not a directory, so we push to our list
                    fileList.push({ url: encodeURI(fileElements + '/' + video), name: fileElements });
                    //  }

                    console.log("File -- " + fileElements + '/' + video)
                    //Get all Videos and store their thumbnails in a folder

                
                    //  new ffmpeg("/"+fileElements + "/" + video)
                    //     .takeScreenshots({
                    //         count: 1,
                    //         timemarks: ['600'] // number of seconds
                    //     }, `/thumbnails/${video}`, function (err) {
                    //         console.log('screenshots were saved')
                    //     });

                    // ffmpeg(`/${fileElements}/${video}`)
                    //     .on('end', function () {
                    //         console.log('Screenshots taken');
                    //     })
                    //     .on('error', function (err) {
                    //         console.error(err);
                    //     })
                    //     .screenshots({
                    //         // Will take screenshots at 20%, 40%, 60% and 80% of the video
                    //         count: 4,
                    //         folder: `/thumbnails/${video}`
                    //     });

                });

            });

        });

    });


    return fileList;

};

module.exports = { findVideos };
