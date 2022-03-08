/*jshint strict:false, esversion: 9, node: true */
const store = require('../store/store');

module.exports = list;
function list(req, res) {
  res.status(200).json(store.getState().files);
}
