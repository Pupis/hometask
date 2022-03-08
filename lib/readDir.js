/*jshint strict:false, esversion: 9, node: true */
const { readdirSync, Dirent } = require('fs');

readDir = (dir) => {
    let files, filenames;
    try {
        files = readdirSync(dir, { withFileTypes: true});
    } catch(e) {}
    if (files) {
        filenames = files
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name);

    }
    return filenames;
};

module.exports = readDir;