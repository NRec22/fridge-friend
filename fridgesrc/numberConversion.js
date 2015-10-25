string voicerec = "I want to add 10 apples";

var re1 = //

var re = /(add|remove)\s(\d*)\s([a-zA-Z]{2,})/;

var parseResult = voicerec.match(re); //array [0]= matched string, [1]= matched word 1, [n-1] = int index where it was found, [n] = input

parseResult =

var apple = {quantity: parseInt(parseResult[2]), expiration:14};





if(parseResult[1]=='add'){
  //database add quantity
}

if(parseResult[1]=='remove'){
  //database subtract quantity
}
