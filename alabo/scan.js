const fs = require('fs')
const path = require('path')
const javascript = 'videos/javascript';
var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            // filelist = walkSync(dir + '/'+ file + '/', filelist);
            // do nothin

        } else {
            // filelist.push(dir+'/'+file);
            filelist.push(encodeURI(file));
        }
    });
    return filelist;
};

module.exports = walkSync;