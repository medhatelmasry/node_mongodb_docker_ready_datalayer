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
  var data = [
    {
    "FirstName":"Sally",
    "LastName":"Baker",
    "School":"Mining",
    "StartDate": new Date("2012-02-20T08:30:00")
    },{
    "FirstName":"Jason",
    "LastName":"Plumber",
    "School":"Engineering",
    "StartDate": new Date("2018-03-17T17:32:00")
    },{
    "FirstName":"Jill",
    "LastName":"Taylor",
    "School":"Political Science",
    "StartDate": new Date("2014-06-20T08:30:00")
    },{
    "FirstName":"Fred",
    "LastName":"Fisher",
    "School":"Environmental Sciences",
    "StartDate": new Date("2017-10-16T17:32:00")
    }
  ];
   dbo.collection("students").insertMany(data, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});