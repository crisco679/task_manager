var express = require('express');
var router = express.Router();
var path = require('path');
var task = require('./taskRoute.js');
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});
router.use('/tasks', task);
module.exports = router;
