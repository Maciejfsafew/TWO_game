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
var playfield = map.readFieldDefinition("public/assets/test.field");
var db_helper = require('./backend/db_helper');

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

    spark.on('sleep', function (sleepCommand, responseCallback) {
        responseCallback({'msg': ''});
    });

    spark.on('wakeup', function (wakeupCommand, responseCallback) {
        responseCallback({'msg': ''});
    });

    spark.on('login', function (data, responseCallback) {
        if (data.u != null && data.p != null) {
            db_user.findOne({'username': data.u}, function (err, user) {
                if (err) {
                    responseCallback({'login_answer': 'error'});
                    return console.error(err);
                }
                if (user != null) {
                    if (data.p === user.password) {
                        spark.request.session.username = data.u;
                        responseCallback({'login_answer': 'success'});
                    }
                    else {
                        responseCallback({'login_answer': 'bad'});
                    }
                }
                else {
                    var new_person = new Person(data.u);
                    var us = db_helper.per2us(db_user, data, new_person);
                    us.save(function (err, us) {
                        if (err) {
                            responseCallback({'login_answer': 'error'});
                            return console.error(err);
                        }
                        spark.request.session.username = data.u;
                        responseCallback({'login_answer': 'success'});
                    });
                }
            });
        }
    });

    spark.on('pause', function (data, responseCallback) {
        responseCallback({'msg': ''});
    });

    spark.on('get_person', function (data, responseCallback) {
        db_user.findOne({'username': data.u}, function (err, user) {
            if (err) {
                responseCallback({'get_person_answer': 'error'});
                return console.error(err);
            }
            if (user != null) {
                responseCallback({'get_person_answer': 'success', 'person': db_helper.us2per(Person, user)});
            }
            else {
                responseCallback({'get_person_answer': 'error'});
            }
        });
    });

    spark.on('update_person', function (data, responseCallback) {
        db_helper.updatePerson(db_user, data.person, responseCallback);
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
                    'get_person_answer': 'success', 'person': db_helper.us2per(Person, user),
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