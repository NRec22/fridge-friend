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
    parse        = require('./my_modules/v2'),
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


app.get('/', function(req, res) {
  res.render('index', { ct: req._csrfToken });
  var parsed = parse(req.body.text);
  console.log(parsed);
  // for(var i=0; i<parsed.length;i++)
  //   mongo(parsed[i]);
});

var a;
app.post('/text', function(req, res) {
  var parsed = parse(req.body.text);
  for(var i=0; i<parsed.length;i++)
    mongo(parsed[i]);
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

//was var port = process.env.VCAP_APP_PORT || 3000;
var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening at:', port);
