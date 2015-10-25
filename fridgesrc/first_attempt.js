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
          subtractFood(db, 5, 3, "apple");
          subtractFood(db, 3, 3, "apple");
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
        }
    );
};

var subtractFood = function(db, prevNum, subtractNum, name){
    var collection = db.collection('inventory');
    var updateNum = prevNum - subtractNum;
    //subtract the food
    if(updateNum === 0){
        removeFood(db, name);
    }
    else{
        collection.update(
            {"type": name},
            {
                $set: {
                    "quantity": updateNum
                }
            }
        );
        //don't worry, this works
        console.log("Quantity was updated!");
    }
};

var removeFood = function(db, name){
    var collection = db.collection('inventory');

    collection.remove(
        {
            "type": name
        }
    );
    //don't worry, this works
    console.log("Food was removed");
}
