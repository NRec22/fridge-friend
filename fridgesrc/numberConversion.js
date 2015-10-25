//string voicerec = "I want to add ten apples";

//convert the string representing a number into digits


var parse = function(voicerec) {
  var manualExpiration = false;


  voicerec.replace(/eighteen/,"18");
  voicerec.replace(/seventeen/,"17");
  voicerec.replace(/sixteen/,"16");
  voicerec.replace(/fifteen/,"15");
  voicerec.replace(/fourteen/,"14");
  voicerec.replace(/thirteen/,"13");
  voicerec.replace(/twelve|dozen/,"12");
  voicerec.replace(/eleven/,"11");
  voicerec.replace(/ten/,"10");
  voicerec.replace(/nine/,"9");
  voicerec.replace(/eight/,"8");
  voicerec.replace(/seven/,"7");
  voicerec.replace(/six|half a dozen/,"6");
  voicerec.replace(/five/,"5");
  voicerec.replace(/four/,"4");
  voicerec.replace(/three/,"3");
  voicerec.replace(/two|pair of/,"2");
  voicerec.replace(/an|one/,"1");

  var re = /(add|remove)\s(\d*)\s([a-zA-Z]{2,})/;

  var parseResult = voicerec.match(re); //array [0]= matched string, [1]= matched word 1, [n-1] = int index where it was found, [n] = input

  if (parseResult[4]=='expir'){
    manualExpiration = true;
  }

  return{quantity: parseInt(parseResult[2]), type:parseResult[3], manualExpiration:manualExpiration};

  // if(parseResult[1]=='add'){
  //   //database add quantity
  //   insertFood{item}
  // }

  // if(parseResult[1]=='remove'){
  //   //database subtract quantity
  // }
}