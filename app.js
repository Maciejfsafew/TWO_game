// server.js
// load the things we need

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var Primus = require("primus");
var primus = new Primus(server, {transformer: "engine.io"});
var db_user = require('./public/js/db_user');
var Person = require("./public/js/person");
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

primus.on("connection", function (spark) {
    spark.on('data', function message(data) {
        if (data.u != null && data.p != null) {
            db_user.findOne({'username': data.u}, function (err, user) {
                if (err) {
                    spark.write({'login_answer': 'error'});
                    return console.error(err);
                }
                if (user != null) {
                    if (data.p === user.password) {
                        spark.write({'login_answer': 'success'});
                    }
                    else {
                        spark.write({'login_answer': 'bad'});
                    }
                }
                else {
                    var new_person = new Person(data.u);
                    var us = per2us(data, new_person);
                    us.save(function (err, us) {
                        if (err) {
                            spark.write({'login_answer': 'error'});
                            return console.error(err);
                        }
                        spark.write({'login_answer': 'success'});
                    });
                }
            });
        }
        else if (data === 'pause') {
            spark.write('pause_answer');
        }
        else if (data === 'sleep') {
            spark.write('sleep_answer');
        }
        else if (data === 'wakeup') {
            spark.write('wakeup_answer');
        }
        else if (data.action === 'get_person') {
            db_user.findOne({'username': data.u}, function (err, user) {
                if (err) {
                    spark.write({'get_person_answer': 'error'});
                    return console.error(err);
                }
                if (user != null) {
                    spark.write({'get_person_answer': 'success', 'person': us2per(user)});
                }
                else {
                    spark.write({'get_person_answer': 'error'});
                }
            });
        }
        else if (data.action === 'update_person') {
            db_user.findOne({'username': data.person.name}, function (err, user) {
                if (err) {
                    spark.write({'update_person_answer': 'error'});
                    return console.error(err);
                }
                if (user != null) {
                    user.strength = data.person.strength;
                    user.dexterity = data.person.dexterity;
                    user.hp = data.person.hp;
                    user.maxhp = data.person.maxhp;
                    user.level = data.person.level;
                    user.experience = data.person.experience;
                    user.items = data.person.items;
                    user.currentField = data.person.currentField;
                    user.sleep = data.person.sleep;
                    user.save(function (err, us) {
                        if (err) {
                            spark.write({'update_person_answer': 'error'});
                            return console.error(err);
                        }
                        spark.write({'update_person_answer': 'success'});
                    });
                }
                else {
                    spark.write({'update_person_answer': 'error'});
                }
            });
        }
        else {
            spark.write({'login_answer': 'error'});
        }
    });
})

server.listen(8080);
console.log('8080 is where the magic happens');


var map = require("./public/js/map");
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
    person.sleep = user.sleep;
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
        currentField: person.currentField,
        sleep: person.sleep
    });
}