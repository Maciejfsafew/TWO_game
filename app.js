// server.js
// load the things we need

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var Primus = require("primus");
var primus = new Primus(server, {transformer: "engine.io"});
var Person = require("./public/js/person");
var Monster = require("./public/js/monster");
var battle = require("./public/js/battle");
// static assets
app.use('/public', express.static(__dirname + '/public'));

var person = new Person("Hero");
var monster = new Monster("Bad Boy");

console.log((battle(person, monster, true, null) ? person.name : monster.name) + ' win!!!');

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve client-side library
primus.save(__dirname + '/public/lib/primus.js');

// index page (please note, that views is the root folder of all template files!)
app.get('/', function (req, res) {
    res.render('index.html.ejs', {
        'title': "Gra RPG"
    });
});

primus.on("connection", function (spark) {
    spark.write({'message': 'ping'});
    spark.on('data', function message(data) {
        console.log(data);
    });
})

server.listen(8081);
console.log('8080 is where the magic happens');
