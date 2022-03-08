/*jshint strict:false, esversion: 9, node: true */

const express = require('express');
require('dotenv').config();
const list = require('./lib/routes/list');
const scan = require('./lib/routes/scan');
const downloadState = require('./lib/routes/download-state');
const store = require('./lib/store/store');
const { readDir } = require('./lib/store/actions');
const app = express();
const PORT = process.env.PORT;

store.dispatch(readDir());

exports.app = app;

app.use('/list', list);
app.use('/scan', scan);
app.use('/download-state', downloadState);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
