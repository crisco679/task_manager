var pg = require('pg');
var connectionString;
if(process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/task_handler';
}
function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connection to DB!', err);
      process.exit(1);
    } else {
      var createTask = client.query('CREATE TABLE IF NOT EXISTS tasks (' +
        'id SERIAL PRIMARY KEY,' +
        'task_name varchar(255) NOT NULL,' +
        'completed boolean NOT NULL DEFAULT false' +
        ')'
      );
      createTask.on('end', function(){
        console.log('Task query done');
        done();
      });
      createTask.on('error', function(){
        console.log('Error creating taskSchema');
        process.exit(1);
      });
    }
  })
}
module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
