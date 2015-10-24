var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertFood(db, 5, "apple", 14, function(){
      insertFood(db, 3, "orange", 7, function(){
          db.close();
      });
  });
});

var insertFood = function(db, num, name, days, callback){
    var collection = db.collection('inventory');

    // insert the food and its attributes
    collection.insert(
        {
            "quantity": num,
            "type": name,
            "exp": days
        }, function(err, result){
            assert.equal(err, null);
            console.log("Inserted food into the inventory.");
            callback(result);
        });
};
