var parse = function(voicerec) {
  var manualExpiration = false;
  var adding = false;
//turn the string into interpretable format
  voicerec = voicerec.replace(/eighteen/,"18");
  voicerec = voicerec.replace(/seventeen/,"17");
  voicerec = voicerec.replace(/sixteen/,"16");
  voicerec = voicerec.replace(/fifteen/,"15");
  voicerec = voicerec.replace(/fourteen/,"14");
  voicerec = voicerec.replace(/thirteen/,"13");
  voicerec = voicerec.replace(/twelve|dozen/,"12");
  voicerec = voicerec.replace(/eleven/,"11");
  voicerec = voicerec.replace(/ten/,"10");
  voicerec = voicerec.replace(/nine/,"9");
  voicerec = voicerec.replace(/eight/,"8");
  voicerec = voicerec.replace(/seven/,"7");
  voicerec = voicerec.replace(/six|half a dozen/,"6");
  voicerec = voicerec.replace(/five/,"5");
  voicerec = voicerec.replace(/four/,"4");
  voicerec = voicerec.replace(/three/,"3");
  voicerec = voicerec.replace(/two|pair of/,"2");
  voicerec = voicerec.replace(/an |one /,"1 ");
  voicerec = voicerec.replace(/three quarters of a|three quarter|three quarters of an/,"0.75");
  voicerec = voicerec.replace(/half|half an|half a/,"0.5");
  voicerec = voicerec.replace(/third|third of a|third of an/,"0.33");
  voicerec = voicerec.replace(/quarter|quarter of an|quarter of a/,"0.25");
  //further standardizing
  voicerec = voicerec.replace(/of /,"");
  //actual regex
  var reAdd = /(add|adding|insert|inserting|in|get|getting|store|storing|grab|grabbing)/;
  //
  var reValuePair = /(\d*)\s(pound |pounds |serving |servings |)([a-zA-Z]{2,})/;

//  var reAdd = /add|insert|in|store/;

  //var operator = voicerec.match(reOperator); //Array of key words

  // parseResult = voicerec.match(reValuePair); //array [0]= matched string, [1]= amount, [2]= unit , [3]= type,  [n-1] = int index where it was found, [n] = input

  //var numberOfObjects = (parseResult.length-3)/3;

  //operation string to boolean
  if(reAdd.test(voicerec)){
    adding=true;
  }

  var item = [];

  // var i=0;
  // while(i<numberOfObjects){
  //   item.push()
  // }

  var str = voicerec;
  var i = 1;
  while (i<=str.length){
    //console.log("Im in the loop")
    
    var ValuePair = str.match(reValuePair);
    if(ValuePair===null)
      return;
    //console.log(ValuePair[0]);
    //console.log(ValuePair[4]);

    var endIndex = ValuePair.index + ValuePair[0].length;

    //console.log(ValuePair);

    str = str.substring(endIndex -1, str.length)
    if(!isNaN(parseInt(ValuePair[1]))){
      item.push({add:adding, quantity: parseInt(ValuePair[1]), unit: ValuePair[2], type: ValuePair[3]});}
    i=endIndex;
    //console.log('end'+endIndex);
    //console.log(str.length);
  }
  //console.log(parseResult);
  // console.log(item);
  return{item};

}
module.exports = parse;
