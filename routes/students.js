var express = require("express");
var router = express.Router();
var db = require("../db");
const ObjectId = require('mongodb').ObjectId;

router.get('/students', (req, res) => {
    db.getDb( (err,dbo) => {
        if (err) {
            console.log("Database connection failed " + err);
        } else {
            dbo.collection("students").find({}).toArray(function(err, data) {
                if (err) res.send(err);
                res.json(data);
            });
        }
    });
});

// get single student
router.get("/students/:id", function(req, res, next) {

    db.getDb( (err,dbo) => {
        if (err) {
            console.log("Database connection failed " + err);
        } else {
            const id = new ObjectId(req.params.id);
            var query = {_id: id};
            dbo.collection("students").find(query).toArray(function(err, data) {
              if (err) res.send(err);
              res.json(data);
            });
        }
    });
});

// create student
router.post("/students", function(req, res, next) {
    var student = req.body;

    if (!student.StartDate) {
        student.StartDate = new Date();
    }

    if (!student.FirstName || !student.LastName
        || !student.School)  {
        res.status(400);
        res.json(
            {"error": "Bad data, could not be inserted into the database."}
        )
    } else {
        db.getDb( (err,dbo) => {
            if (err) {
                console.log("Database connection failed " + err);
            } else {
                dbo.collection("students").insertOne(student, function(err, data) {
                    if (err) res.send(err);
                    res.json(data);
                });
            }
        });
    }
});

// delete student
router.delete("/students/:id", function(req, res, next) {
    db.getDb( (err,dbo) => {
        if (err) {
            console.log("Database connection failed " + err);
        } else {
            const id = new ObjectId(req.params.id);
            var query = {_id: id};
            dbo.collection("students").deleteOne(query, function(err, data) {
              if (err) res.send(err);
              res.json(data);
            });
        }
    });
});

// edit student
router.put("/students/:id", function(req, res, next) {
    var student = req.body;
    var changedStudent = {};

    if (student.FirstName) {
        changedStudent.FirstName = student.FirstName;
    }

    if (student.LastName) {
        changedStudent.LastName = student.LastName;
    }

    if (student.School) {
        changedStudent.School = student.School;
    }

    if (student.StartDate) {
        changedStudent.StartDate = student.StartDate;
    }

    if (!changedStudent) {
        res.status(400);
        res.json({"error": "Bad Data"})        
    } else {
        db.getDb( (err,dbo) => {
            if (err) {
                console.log("Database connection failed " + err);
            } else {
                const id = new ObjectId(req.params.id);
                var query = {_id: id};
                var newvalues = { $set: changedStudent };
                dbo.collection("students").updateOne(query, newvalues, function(err, data) {
                    if (err) res.send(err);
                    res.json(data);
                });
            }
        });
    }
});


module.exports = router;
