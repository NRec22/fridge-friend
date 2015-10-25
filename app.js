/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express      = require('express'),
    app          = express(),
    vcapServices = require('vcap_services'),
    extend       = require('util')._extend,
    watson       = require('watson-developer-cloud'),
    parse        = require('./my_modules/parseInput'),
    mongo        = require('./my_modules/plzwork');

// Bootstrap application settings
require('./config/express')(app);

// For local development, replace username and password
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '4581f165-b11d-47c6-81c4-cb5bb85ce443',
  password: 'rZK9loQL4klv'
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);

// var setTimer = function () {
//   var now = getDate();
//   var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
//   if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
//   }
//   setTimeout(function(){mongo.updateExp();}, millisTill10);

// }

app.get('/', function(req, res) {
  res.render('index', { ct: req._csrfToken });
});
var a;
app.post('/text', function(req, res) {
  a = mongo(parse(req.body.text));
});

app.get('/result', function(req,res) {
  res.render('result', {text: a[0].type});
});

// Get token using your credentials
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
