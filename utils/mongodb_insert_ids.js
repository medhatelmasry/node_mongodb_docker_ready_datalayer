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
  var myobj =     [
    {
    _id: 154, 
    "FirstName":"Linda",
    "LastName":"Turner",
    "School":"Mangement",
    "StartDate": new Date("2016-02-20T08:30:00")
     },{
    _id: 155,
    "FirstName":"Leo",
    "LastName":"Harrison",
    "School":"Aviation",
    "StartDate": new Date("2013-10-16T17:32:00")
    }
  ];

  dbo.collection("students").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});