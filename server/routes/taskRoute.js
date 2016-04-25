var express = require('express');
var app = express();
var router = express.Router();
var pg = require('pg');
var connection = require('../db/connection');

var connectionString = connection.connectionString;

router.post('/', function(request, response){
  console.log(request.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var task_name =  request.body.task_name;
      var results = [];

      var query = client.query('INSERT INTO tasks(task_name, completed)' + 'VALUES ($1, false) RETURNING task_name',
      [task_name]);

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      })
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});
router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT id, task_name, completed FROM tasks ORDER BY id');
      var results = [];

      query.on('error', function(error){
        console.log(error);

        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        console.log('rowData', rowData);
        results.push(rowData);
      })
      query.on('end', function(){
        response.send(results);
        console.log('results', results);
        done();
      });
    }
  });
});
router.delete('/:id', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var id = request.params['id'];
      console.log('this is the value of id', id)
      var query = client.query('DELETE FROM tasks WHERE id=($1)', [id]);
      var results = [];
      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      })
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});
router.post('/toggle:id', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var id = request.params['id'];
      var query = client.query('UPDATE tasks SET completed = NOT completed WHERE id=($1)', [id]);
      var results = [];
      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      })
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});
module.exports = router;
