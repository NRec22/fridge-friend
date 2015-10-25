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
          subtractFood(db, 2, "apple", function(){
              db.close();
          });
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
        }
    );
};

var subtractFood = function(db, prevNum, saidNum, name, callback){
    var collection = db.collection('inventory');

    //remove the food
    collection.update(
        {"type": name},
        {
            $set: {
                "quantity": prevNum - saidNum
            }
        }, function(err, result){
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Quantity changed in inventory.");
            //callback(result);
        }
    );
};
