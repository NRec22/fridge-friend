var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  // insertDocuments(db, function() {
  //   updateDocument(db, function() {
  //     db.close();
  //   });
  // });
});

var insertFood = function(db, food, number, expiration){
    var collection = db.collection('inventory');

    // insert the food and its attributes
    collection.insert(
        {
            "quantity": number,
            "type": food,
            "exp": expiration
        });
}
