"use strict";
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/test', function (req, res) {
    res.send('Test it!');
});
module.exports = router;
