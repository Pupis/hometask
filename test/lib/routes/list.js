/*jshint strict:false, esversion: 9, node: true */

const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("list", () => {
    let list, stub, res, state;
    before(() => {
        res = {
            json: cmem()
        };
        state = {
            files: []
        };
        stub = {
            store: {
                getState: cmem().$unit(state)
            },
            req: cmem(),
            res: {
                status: cmem().$unit(res)
            }
        };
        cmem.clear();
        list = sandboxed.require('../../../lib/routes/list', {
            requires: {
                '../../lib/store/store': stub.store
            }
        });
    });
    it("should return list", () => {
        list(stub.req, stub.res);
        assert.deepEqual(res.json.$args[0], state.files);
    });
});
