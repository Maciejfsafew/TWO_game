// server.js
// load the things we need

var express = require('express');
var http = require('http');
var app = express();
var Primus = require("primus");
var Emitter = require('primus-emitter');
var server = http.createServer(app);

var primus = new Primus(server, { transformer: "engine.io", parser: 'JSON' });
primus.use('emitter', Emitter);
var db_user = require('./backend/db_user');
var Person = require("./backend/person");
// static assets
app.use('/public', express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve client-side library
primus.save(__dirname + '/public/lib/primus.js');

// index page (please note, that views is the root folder of all template files!)
app.get('/', function (req, res) {
    res.render('login.html.ejs', {
        'title': "Gra RPG - Login page"
    });
});

// index page (please note, that views is the root folder of all template files!)
app.get('/game', function (req, res) {
    res.render('index.html.ejs', {
        'title': "Gra RPG"
    });
});

var map = require("./public/js/map");
//console.log(map.readFieldDefinition())
var playfield = map.readFieldDefinition("public/assets/test.field");

primus.on("connection", function (spark) {
    //{ move: 'N/S/W/E' }
    spark.on('move', function (moveCommand, responseCallback) {
        try {
            responseCallback({'msg': "Move to:" + moveCommand.move});
        } catch (err) {
            console.log("Communication error");
        }
    });
    spark.on('map', function (mapCommand, responseCallback) {
        try {
            responseCallback({'msg': "map"});
        } catch (err) {
            console.log("Communication error");
        }
    });
    spark.on('bag', function (bagCommand, responseCallback) {
        try {
            responseCallback({'msg': "bag"});
        } catch (err) {
            console.log("Communication error");
        }
    });
    spark.on('login', function (data, respond) {
        if (data.u != null && data.p != null) {
            db_user.findOne({'username': data.u}, function (err, user) {
                if (err) {
                    respond({'login_answer': 'error'});
                    return console.error(err);
                }
                if (user != null) {
                    if (data.p === user.password) {
                        respond({'login_answer': 'success'});
                    }
                    else {
                        respond({'login_answer': 'bad'});
                    }
                }
                else {
                    var new_person = new Person(data.u);
                    var us = per2us(data, new_person);
                    us.save(function (err, us) {
                        if (err) {
                            respond({'login_answer': 'error'});
                            return console.error(err);
                        }
                        respond({'login_answer': 'success'});
                    });
                }
            });
        }
    });
    spark.on('pause', function(data, fn) {
        fn("pause_answer");
    });
    spark.on('get_person', function (data, fn) {
        db_user.findOne({'username': data.u}, function (err, user) {
            if (err) {
                fn({'get_person_answer': 'error'});
            }else if (user != null) {
                fn({'get_person_answer': 'success', 'person': us2per(user),
                    map: playfield});
            }
            else {
                fn({'get_person_answer': 'error'});
            }
        });
    });
});

server.listen(8080);
console.log('8080 is where the magic happens');


var map = require("./backend/map");
console.log(map.readFieldDefinition("public/assets/test.field"))



function us2per(user) {
    var person = new Person(user.username);
    person.strength = user.strength;
    person.dexterity = user.dexterity;
    person.hp = user.hp;
    person.maxhp = user.maxhp;
    person.level = user.level;
    person.experience = user.experience;
    person.items = user.items;
    person.currentField = user.currentField;
    return person;
}

function per2us(data, person) {
    return new db_user({
        username: data.u,
        password: data.p,
        strength: person.strength,
        dexterity: person.dexterity,
        hp: person.hp,
        maxhp: person.maxhp,
        level: person.level,
        experience: person.experience,
        items: person.items,
        currentField: person.currentField
    });
}