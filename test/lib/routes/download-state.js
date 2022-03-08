/*jshint strict:false, esversion: 9, node: true */

const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("download-state", () => {
    let downloadState, stub, res, state;
    before(() => {
        res = {
            json: cmem()
        };
        state = {};
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
        downloadState = sandboxed.require('../../../lib/routes/download-state', {
            requires: {
                '../../lib/store/store': stub.store
            }
        });
    });
    it("should do return state", () => {
        downloadState(stub.req, stub.res);
        assert.deepEqual(res.json.$args[0], state)
    });
});