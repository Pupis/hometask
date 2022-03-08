/*jshint strict:false, esversion: 9, node: true */

const assert = require('assert');
const cmem = require('cmem');
const sandboxed = require('sandboxed-module');

describe("server", () => {
    let server, stub;
    before(() => {
        stub = {
            dispatch: cmem(),
            use: cmem(),
            express: {
                use: cmem(),
                listen: cmem()
            },
            PORT: 1234,
            readDir: cmem()
        };
        cmem.clear();
        server = sandboxed.require('../../server', {
            requires: {
                'dotenv': { config: cmem() },
                './lib/routes/list': cmem(),
                './lib/routes/scan': cmem(),
                './lib/routes/download-state': cmem(),
                './lib/store/store': {
                    dispatch: stub.dispatch
                },
                './lib/store/actions': {
                    readDir: cmem().$unit(stub.readDir)
                },
                'express': cmem().$unit(stub.express)
            },
            globals: {
                process: {
                    cwd: cmem(),
                    env: {
                        PORT: stub.PORT
                    }
                }
            }
        });
    });
    it("should dispatch event to read files", () => {
        assert.ok(stub.dispatch.$calls);
        assert.deepEqual(stub.dispatch.$args[0], stub.readDir);
    });
    describe("express", () => {
        it("should expose /list", () => {
            assert.equal(stub.express.use.$calls[0].$args[0], '/list');
        });
        it("should expose /scan", () => {
            assert.equal(stub.express.use.$calls[1].$args[0], '/scan');
        });
        it("should expose /download-state", () => {
            assert.equal(stub.express.use.$calls[2].$args[0], '/download-state');
        });
        it("should start listening", () => {
            assert.equal(stub.express.listen.$args[0], stub.PORT);
        });
    });
});
