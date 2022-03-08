/*jshint strict:false, esversion: 9, node: true */
const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("actions", () => {
    let actions;
    before(() => {
        stub = {
            process: {
                argv: ['node', 'start', './path'],
                env: {
                    FOLDER_PATH: './env/path'
                }
            },
            readDirHelper: cmem().$unit(['test.txt', 'test2.txt']),
            store: {
                getState: cmem().$unit({
                    files: [{
                        name: 'test3.txt',
                        active: true
                    }, {
                        name: 'test2.txt',
                        active: false
                    }]
                })
            }
        };
        actions = sandboxed.require('../../../lib/store/actions', {
            requires: {
                'dotenv': {
                    config: cmem()
                },
                '../../lib/readDir': stub.readDirHelper,
                '../../lib/store/store': stub.store
            },
            globals: {
                process: stub.process
            }
        });
    });
    describe('readDir', () => {
        it('should expose readDir function', () => {
            assert.equal(typeof actions.readDir, 'function');
        });
        it('should return files in correct way', () => {
            let result = actions.readDir();
            let expect = {
                type: 'readDir',
                payload: [{
                    name: 'test.txt',
                    active: true
                }, {
                    name: 'test2.txt',
                    active: true
                }]
            };
            assert.deepEqual(result, expect);
        });
    });
    describe('refreshList', () => {
        it('should expose refreshList function', () => {
            assert.equal(typeof actions.refreshList, 'function');
        });
        it('should return files in correct way', () => {
            let result = actions.refreshList();
            let expect = {
                type: 'refreshList',
                payload: [{
                    name: 'test3.txt',
                    active: false
                }, {
                    name: 'test2.txt',
                    active: true
                }, {
                    name: 'test.txt',
                    active: true
                }]
            };
            assert.deepEqual(result, expect);
        });
    });
});
