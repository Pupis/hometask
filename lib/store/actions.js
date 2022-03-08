/*jshint strict:false, esversion: 9, node: true */
require('dotenv').config();
const readDirHelper = require('../readDir');
const store = require('./store');
const pkg = require('../../package.json');
const PATH = process.argv[2] || process.env.FOLDER_PATH || pkg.input;

const readDir = () => {
    const fileList = readDirHelper(PATH).map(name => ({
        name: name,
        active: true
    }));
    return {
        type: 'readDir',
        payload: fileList
    };
};

const refreshList = () => {
    const files = store.getState().files;
    const fileList = readDirHelper(PATH);
    let stateFiles = [];

    stateFiles = files.map((item) => {
        if (fileList.indexOf(item.name) >= 0) {
            return item;
        } else {
            return {
                name: item.name,
                active: false
            };
        }
    });
    fileList.map((filename) => {
        let found = false;
        for (var i = 0; i < stateFiles.length; i++) {
            if (stateFiles[i].name === filename) {
                stateFiles[i].active = true;
                found = true;
            }
        }
        if (!found) {
            stateFiles.push({
                name: filename,
                active: true
            });
        }
    });
    return {
        type: 'refreshList',
        payload: stateFiles
    };
};

exports.readDir = readDir;
exports.refreshList = refreshList;
