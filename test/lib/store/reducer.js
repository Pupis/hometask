/*jshint strict:false, esversion: 9, node: true */
const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("reducer", () => {
    let reducer;
    before(() => {
        stub = {
        };
        reducer = sandboxed.require('../../../lib/store/reducer');
    });
    it("should expose function", () => {
        assert.equal(typeof reducer, 'function');
    });
    it("should has readDir event", () => {
        let files = ['a', 'b'];
        assert.deepEqual(reducer({files: []}, {
            type: 'readDir',
            payload: files
        }), { files: files });
    });
    it("should has refreshList event", () => {
        let files = ['a', 'b'];
        assert.deepEqual(reducer({files: []}, {
            type: 'refreshList',
            payload: files
        }), { files: files });
    });
    it("should has default event", () => {
        let state = { files: [] };
        assert.deepEqual(reducer(state, {}), state);
    });
});
