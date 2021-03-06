var MongoClient = require('mongodb').MongoClient;

// Environment variables
var dotenv = require('dotenv');
var path = require('path');
let confPath = path.join(__dirname,'../','.env' );
dotenv.config({ path: confPath });
var db_server = process.env.DB_SERVER || "localhost";
var url = 'mongodb://' + db_server + ':27017';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("school");
  dbo.createCollection("students", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});