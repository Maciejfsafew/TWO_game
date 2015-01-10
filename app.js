// server.js
// load the things we need

var express = require('express');
var expressSession = require('express-session');
var http = require('http');
var app = express();
var Primus = require("primus");
var Emitter = require('primus-emitter');
var server = http.createServer(app);

var memoryStore = new expressSession.MemoryStore();
var session = expressSession({
    store: memoryStore,
    secret: 'e570f59eb46209f572f934aae4e90562',
    resave: false,
    saveUninitialized: true
});

//our modules
var db_user = require('./backend/db_user');
var Person = require("./backend/person");
var map = require("./backend/map");

// session store
app.use(session);

// static assets
app.use('/public', express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');


var primus = new Primus(server, {transformer: "faye", parser: 'JSON'});
primus.use('emitter', Emitter);
primus.before('session', session);

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
    //{ move: 'N/S/W/E' }
    spark.on('move', function (moveCommand, responseCallback) {
        try {
            responseCallback({
                'msg': "Move " + spark.request.session.username + " to:" + moveCommand.move,
                'location': {x: 1, y: 1}
            });
        } catch (err) {
            //TODO: add response to the client
            console.log(err);
        }
    });
    //mapCommand doesn't have arguments
    spark.on('map', function (mapCommand, responseCallback) {
        try {
            responseCallback({'msg': "map"});
        } catch (err) {
            //TODO: add response to the client
            console.log(err);
        }
    });
    //bag doesn't have arguments
    spark.on('bag', function (bagCommand, responseCallback) {
        try {
            responseCallback({'msg': "bag"});
        } catch (err) {
            //TODO: add response to the client
            console.log(err);
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
                        spark.request.session.username = data.u;
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
                        spark.request.session.username = data.u;
                        respond({'login_answer': 'success'});
                    });
                }
            });
        }
        else if (data === 'pause') {
            spark.write('pause_answer');
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
    spark.on('pause', function (data, fn) {
        fn("pause_answer");
    });
    spark.on('get_person', function (data, fn) {
        db_user.findOne({'username': data.u}, function (err, user) {
            if (err) {
                fn({'get_person_answer': 'error'});
            } else if (user != null) {
                fn({
                    'get_person_answer': 'success', 'person': us2per(user),
                    map: playfield
                });
            }
            else {
                fn({'get_person_answer': 'error'});
            }
        });
    });
});

server.listen(8080);
console.log('8080 is where the magic happens');


//TODO: Please move it somewhere else (e.g. make it methods on Person, create utilities module etc.) :)
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