/*jshint strict:false, esversion: 9, node: true */

const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("scan", () => {
    let scan, stub, res, action;
    before(() => {
        res = {
            json: cmem()
        };
        action = {};
        stub = {
            store: {
                dispatch: cmem()
            },
            req: cmem(),
            res: {
                status: cmem().$unit(res)
            },
            actions: {
                refreshList: cmem().$unit(action)
            }
        };
        cmem.clear();
        scan = sandboxed.require('../../../lib/routes/scan', {
            requires: {
                '../../lib/store/store': stub.store,
                '../../lib/store/actions': stub.actions
            }
        });
        scan(stub.req, stub.res);
    });
    it("should return message", () => {
        assert.deepEqual(res.json.$args[0], { message: 'Scan was made' });
    });
    it("should dispatch refreshList event", () => {
        assert.equal(stub.actions.refreshList.$count, 1);
        assert.deepEqual(stub.store.dispatch.$count, 1);
        assert.deepEqual(stub.store.dispatch.$args[0], action);
    });
});
