/*jshint strict:false, esversion: 9, node: true */
const { Dirent } = require('fs');
const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("readDir", () => {
    let readDir, stub;
    before(() => {
        let filesNames = ['first.js', 'second.js', 'lib', 'third.js'];
        let files = [];
        for (var i = 0; i < filesNames.length; i++) {
            let file = new Dirent(filesNames[i]);
            file.isFile = i == 2 ? cmem().$unit(false) : cmem().$unit(true);
            files.push(file);
        }
        stub = {
            fs: {
                readdirSync: cmem().$unit(files)
            }
        };
        readDir = sandboxed.require('../../lib/readDir', {
            requires: {
                'fs': stub.fs
            }
        });
    });
    it("should return files", () => {
        assert.deepEqual(readDir('/path'), [ 'first.js', 'second.js', 'third.js' ]);
    });
});
