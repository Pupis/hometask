/*jshint strict:false, esversion: 9, node: true */

const { createStore } = require('redux');
const reducer = require('./reducer');
const store = createStore(reducer);

module.exports = store;