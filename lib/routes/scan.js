/*jshint strict:false, esversion: 9, node: true */

const store = require("../store/store");
const { refreshList } = require('../store/actions');

module.exports = scan;
function scan(req, res) {
  store.dispatch(refreshList());
  res.status(200).json({message: 'Scan was made'});
}
