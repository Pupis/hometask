/*jshint strict:false, esversion: 9, node: true */
const store = require('../store/store');

downloadState = (req, res) => {
  res.status(200).json(store.getState());
}

module.exports = downloadState;
