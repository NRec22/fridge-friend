var db = [];
var handleInp = function(input) {
  if(input.add===true)
    insertFood(db,input.quantity,input.type);
  else
    subtractFood(db,input.quantity,input.type);
  console.log(db[0]);
  return db;
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return i;
        }
    }
    return -1;
}

var insertFood = function(db, num, name){
    //var days = referExpiration(name);
    //console.log("Days until expiration for " + name + " added.");
    db.push({name:name,count:num});
    

    console.log("Inserted " + name + " into the inventory");
}

var subtractFood = function(db, subtractNum, name){
    //var collection = db.collection('inventory');
    var negateNum = subtractNum * (-1);

    //subtract the food
    var index = search(name,db);
    if(index>0) {
      var x = db[index].count;
      if(x>1)
        db[index].count -= negateNum;
      else if(x===1)
        db.splice(index-1,index);
    }

    //don't worry, this works
    console.log("Quantity of " + name + " was updated!");

    //remove the food item when quantity is zero
    
}

// var removeFood = function(db, name){
//     //var collection = db.collection('inventory');

//     delete db[name];
//     //don't worry, this works
//     console.log(name + " was removed.");
// }

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
// var expirationCheck = function(db){
//     //var collection = db.collection('inventory')

//     collection.find(
//         {"exp": {$lt: 4}}
//     );
//     console.log("ExpirationCheck has been run.");
// };

//updates the food with expirations dates
// var updateExpiration = function(db){
//     //var collection = db.collection('inventory');

//     collection.update(
//         {"exp": {$ne: false}}, {$inc: {"exp": -1}}, {multi: true}
//     );
//     console.log("All foods with expirations were decremented.")
// };

module.exports = handleInp;