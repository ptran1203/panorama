const fs = require('fs-extra');
const copyFunc = function (src, dest, callback) {
    fs.copy(src, dest, function (err) {

        if (err) {
            return console.error(err);
        }

        console.log('Copied to ' + dest);
        typeof (callback) === "function" && callback();
    });
}

const srcImages = './src/contents/';
const destImages = './dist/Contents/';

const srcAssets = './src/assets';
const destAssets = './dist/assets';

const dist = './dist';
const public = './public/dist';

const appDist = '../../app/static/dist'


copyFunc(srcImages, destImages, function () {
    copyFunc(srcAssets, destAssets, function(){
        copyFunc(dist, public);
        copyFunc(dist, appDist);
    })
});



