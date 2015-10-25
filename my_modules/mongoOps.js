var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  // insertFood(db, 5, "apple", true);
  // insertFood(db, 3, "orange", true);
  // subtractFood(db, 5, 3, "apple");
  // subtractFood(db, 3, 3, "apple");
  // insertFood(db, 5, "banana", true);
  // insertFood(db, 4, "beans", false);
  // updateExpiration(db);
  // expirationCheck(db);
  // db.close();
});

var handleInp = function(input) {
  if(input[0])
    insertFood(db,input.quantity,input.type);
  else
    subtractFood(db,input.quantity,input.type);

}

module.exports = handleInp;

// takes database, quantity, food, and where it is perishable
var insertFood = function(db, num, name){
    var collection = db.collection('inventory');

    // cross reference the expiration table with the name
    var days = referExpiration(name);
    console.log("Days until expiration for " + name + " added.");
    }

    // insert the food and its attributes
    collection.insert(
        {"quantity": num, "type": name, "exp": days}
    );

    console.log("Inserted " + name + " into the inventory");
};

var subtractFood = function(db, subtractNum, name){
    var collection = db.collection('inventory');
    var negateNum = subtractNum * (-1);

    //subtract the food
    collection.update(
      {"type": name}, {$inc: {"quantity": negateNum}}
    );

    //don't worry, this works
    console.log("Quantity of " + name + " was updated!");

    //remove the food item when quantity is zero
    var currentItem = collection.findOne({"type: name"}));
    var currentQuantity = currentItem.num;
    if(currentQuantity === 0){
      removeFood(db, name);
    }
};

var removeFood = function(db, name){
    var collection = db.collection('inventory');

    collection.remove(
        {"type": name}
    );
    //don't worry, this works
    console.log(name + " was removed.");
}

// expirationTable is a javascript object
var expirationTable = {};
expirationTable["apple"] = 7;
expirationTable["orange"] = 7;
expirationTable["banana"] = 3;
expirationTable["potato"] = 30;
expirationTable["milk"] = 14;
expirationTable["eggs"] = 18;

//cross references the given name and returns number of days until expiration
var referExpiration = function(name){
    return expirationTable[name];
};

//checks to see if the food flags a notification
var expirationCheck = function(db){
    var collection = db.collection('inventory')

    collection.find(
        {"exp": {$lt: 4}}
    );
    console.log("ExpirationCheck has been run.");
};

//updates the food with expirations dates
var updateExpiration = function(db){
    var collection = db.collection('inventory');

    collection.update(
        {"exp": {$ne: false}}, {$inc: {"exp": -1}}, {multi: true}
    );
    console.log("All foods with expirations were decremented.")
};