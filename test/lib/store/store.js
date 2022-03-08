/*jshint strict:false, esversion: 9, node: true */
const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("store", () => {
    let store, stub, stubStore;
    before(() => {
        stubStore = cmem();
        stub = {
            redux: {
                createStore: cmem().$unit(stubStore)
            },
            reducer: {}
        };
        store = sandboxed.require('../../../lib/store/store', {
            requires: {
                'redux': stub.redux,
                '../../lib/store/reducer': stub.reducer
            }
        });
    });
    it("should create store", () => {
        assert.deepEqual(store, stubStore);
    });
    it("should call reducer", () => {
        assert.deepEqual(stub.redux.createStore.$args[0], stub.reducer);
    });
});
