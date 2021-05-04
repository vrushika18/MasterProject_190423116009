
//const{query} = require('express');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/process_request', function (req, res) {
   // Prepare output in JSON format
   response = {
      Name:req.query.name, 
      EmailNumber:req.query.email,
      Number:req.query.no,
      Message:req.query.msg
   };
   console.log(response);
   res.end(JSON.stringify(response));
   
   
    var mongodb = require('mongodb');
    var mongoClient = mongodb.MongoClient;
    var url = "mongodb://localhost:27017/";
    mongoClient.connect(url, function(err, databases) {
    if (err) {
        throw err;
    }

    var nodetestDB = databases.db("ContactDB"); //here  
    var customersCollection = nodetestDB.collection("EnquiryData");
    var id=1;
    var customer = { Name:req.query.name, 
      EmailNumber:req.query.email,
      Number:req.query.no,
      Message:req.query.msg };
    
    customersCollection.insertOne(customer, function(error) {
        if (error) {
            throw error;
        }
        id=id+1;
        console.log("1 document inserted");
        databases.close();
    });
});

})

app.get('/processRequest', function (req, res) {
   // Prepare output in JSON format
   response = {
    Name:req.query.name, 
    EmailNumber:req.query.email,
    Number:req.query.no,
    Service:req.query.service,
    Date:req.query.date,
    Time:req.query.time
   };
   console.log(response);
   res.end(JSON.stringify(response));
   
   
    var mongodb = require('mongodb');
    var mongoClient = mongodb.MongoClient;
    var url = "mongodb://localhost:27017/";
    mongoClient.connect(url, function(err, databases) {
    if (err) {
        throw err;
    }

    var nodetestDB = databases.db("AppointmentDB"); //here  
    var customersCollection = nodetestDB.collection("AppointmentData");
    var id=1;
    var customer = { Name:req.query.name, 
      EmailNumber:req.query.email,
      Number:req.query.no,
      Message:req.query.msg,
      Service:req.query.service,
      Date:req.query.date,
      Time:req.query.time };
    
    customersCollection.insertOne(customer, function(error) {
        if (error) {
            throw error;
        }
        id=id+1;
        console.log("1 document inserted");
        databases.close();
    });
});


})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

