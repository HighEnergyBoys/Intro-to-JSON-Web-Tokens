//Typings refs
/// <reference path="./typings/globals/node/typings.json" />
/// <reference path="./typings/globals/express/index.d.ts" />
/// <reference path="./typings/globals/body-parser/index.d.ts" />
/// <reference path="./typings/globals/jsonwebtoken/index.d.ts" />
/// <reference path="./typings/globals/morgan/index.d.ts" />
/// <reference path="./typings/globals/mongoose/index.d.ts" />

//Get information
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var path = require('path');
//Dev Tools
var morgan = require('morgan');

//Required Files
var config = (path.join(__dirname + '/config.js'));
var User = ('./server/models/user.js');

//Apply port
var port = process.env.PORT || 8080;

//Configure Database Connection
mongoose.connect('mongodb://127.0.0.1/authorization');
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Log all events
app.use(morgan('dev'));

//Basic Routes

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function (req, res) {
    //Create Sample User
    var Casey = new User({
        email: 'casey.spires@eku.edu',
        password: 'Evangelion009',
        admin:true
    });
    Casey.Save(function(err) {
       if (err) throw err; 

       console.log('User Saved');
       res.json({ success: true });
    });
});
// Tell Server to Listen
app.listen(port);
console.log('Magic happens at http://localhost:' + port);