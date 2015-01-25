// server.js
// load the things we need

var express = require('express');
var expressSession = require('express-session');
var http = require('http');
var app = express();
var Primus = require("primus");
var Emitter = require('primus-emitter');
var server = http.createServer(app);
var fs = require('fs');

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
var Items = require("./backend/items");
var Store = require("./backend/store_helper");
var battle = require("./backend/battle");
var map = require("./backend/map");
var playfield = map.readFieldDefinition("public/assets/test.field");
var FieldType = require("./backend/fieldTypes");
var db_helper = require('./backend/db_helper');
var Quiz = require('./backend/quiz/quiz')();
var quest_helper = require('./backend/quest_helper');
var highscores = require('./backend/highscores');
var _ = require("underscore");
var FieldType = require("./backend/fieldTypes");

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

// view with high scores
app.get('/highscores', function (req, res) {
    res.render('highscores.html.ejs', {
        'title': "Gra RPG - High scores"
    });
});


primus.on("connection", function (spark) {
    //{ move: 'N/S/W/E' }
    spark.on('move', function (moveCommand, responseCallback) {
        function handleOldQuiz(person) {
            var msg = '';
            var oldField = person.getCurrentPlayfield();
            if (spark.request.session.activeQuiz) {
                msg = "You ran away from the quiz. Chest disappeared.<br/>"
                Quiz.hideChest(oldField);
                spark.request.session.activeQuiz = null;
            }
            return msg;
        }

        try {
            db_helper.getPerson(db_user, Person, moveCommand.u, function (person) {
                var moved = map.movePerson(person, moveCommand.move);
                var msg = "";
                msg += handleOldQuiz(person);
                var is_dead = false;
                if (moved.status === true) {
                    person.currentLocation = moved.location;
                    msg += "Moved " + person.name + " to: {x:" + person.currentLocation.x + ", y:" + person.currentLocation.y + "} " + map.getFieldDescription(moved.field);
                    if (moved.field != null) {
                        var type = moved.field.type;
                        var monster = moved.field.monster;
                        Items.updateStats(person);
                        if (type != null && type === FieldType.MONSTER && monster != null) {
                            //update monster stats before action
                            Items.updateStats(monster);
                            var battle_result = battle(person, monster, true, null, "");
                            var whoWin = (battle_result.result ? person.name : monster.name) + ' win!!!';
                            console.log(whoWin);
                            msg += ("<br><br>Fight:" + battle_result.str + "<br>" + whoWin + "<br>" + (!battle_result.result ? "You are dead. :(" : ""));
                            if (!battle_result.result) {
                                is_dead = true;
                                person.die();
                            }
                            else {
                                moved.field.type = FieldType.PATH;
                                person.addExperience(monster);
                                person.attackedMonsters += 1;
                            }
                        }
                    }
                    var quest_message = quest_helper.getQuest(person);
                    if (quest_message) {
                        //console.log(quest_message);
                        msg += " " + quest_message;
                    }
                } else {
                    msg = "Can't move there!"
                }

                db_helper.updatePerson(db_user, person, function (update_result) {
                    if (update_result.update_person_answer == "success") {
                        responseCallback({
                            'msg': msg,
                            'location': person.currentLocation,
                            'person': person,
                            'is_dead': is_dead
                        });
                    }
                });
            });
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
            console.log(err);
        }
    });
    spark.on('answer', function (answerCommand, responseCallback) {
        try {
            db_helper.getPerson(db_user, Person, answerCommand.u, function (person) {
                var quiz = spark.request.session.activeQuiz;
                var msg = "";
                if (quiz) {
                    var field = person.getCurrentPlayfield();
                    console.log(answerCommand.answer);
                    if (quiz.checkAnswers(answerCommand.answer)) {
                        msg = "Correct answer! ";
                        var lootItems = field.items;
                        var lootGold = field.gold;
                        person.gold += lootGold;
                        person.items.push.apply(person.items, lootItems);
                        person.completedQueezes += 1;
                        lootItems = _.map(lootItems, function (item) {
                            return item.name;
                        });
                        msg += "You receive: " + lootItems.join(", ");
                        if (lootItems.length > 0) {
                            msg += " and "
                        }
                        msg += lootGold + " gold";
                    }
                    else {
                        msg = "Wrong answer! Chest disappears.";
                    }
                    Quiz.hideChest(field);
                    spark.request.session.activeQuiz = null;
                } else {
                    msg = "There was no question!"
                }
                db_helper.updatePerson(db_user, person, function (update_result) {
                    if (update_result.update_person_answer == "success") {
                        responseCallback({
                            'msg': msg
                        });
                    }
                });
            });
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
            console.log(err);
        }
    });
    spark.on('loot', function (answerCommand, responseCallback) {
        try {
            function handleLooting(person) {
                var msg = "Nothing to loot here!";
                var quiz = Quiz.generateQuiz(person.getCurrentPlayfield());
                spark.request.session.activeQuiz = quiz;
                if (quiz) {
                    msg = "You open the chest. Solve the quiz! " +
                    "Answer with 'ans' command followed by answer numbers, i.e. 'ans 1 2'<br/>";
                    msg += quiz.toString();
                }
                responseCallback({'msg': msg});
            }

            db_helper.getPerson(db_user, Person, answerCommand.u, handleLooting);
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
            console.log(err);
        }
    });
    spark.on('map', function (mapCommand, responseCallback) {
        try {
            db_helper.getPerson(db_user, Person, mapCommand.u, function (person) {
                var location = person.currentLocation;
                responseCallback({'msg': "success", 'map': person.playfield, 'location': location});
            });
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
            console.log(err);
        }
    });
    //bag doesn't have arguments
    spark.on('bag', function (bagCommand, responseCallback) {
        try {
            var msg = "";
            db_helper.getPerson(db_user, Person, bagCommand.u, function (person) {
                if (person.items < 1 || typeof person.items == 'undefined') {
                    msg = "Your bag is empty.";
                } else {
                    msg = "Your bag contains:<br>" + Items.showBag(person);
                }
                responseCallback({'msg': msg});
            });

        } catch (err) {
            console.log(err);
        }
    });

    spark.on('buy', function (buyCommand, responseCallback) {
        try {
            db_helper.getPerson(db_user, Person, buyCommand.u, function (person) {
                var msg = "";
                var location = person.currentLocation;
                var field = person.playfield[location.x][location.y];
                if (field && field.type === FieldType.STORE) {
                    if (buyCommand.buy == 0) {
                        msg = "You have: " + person.gold;
                        msg += "<br>Items to buy:<br>" + Store.showStore();
                    } else if (buyCommand.buy > 0 && buyCommand.buy < 6) {
                        msg = Store.buy(person, buyCommand.buy);
                        db_helper.updatePerson(db_user, person, function (update_result) {
                            if (update_result.update_person_answer == "success") {
                                responseCallback({
                                    'msg': msg
                                });
                            }
                        });
                    }
                } else {
                    msg = "You must be in STORE to use this command.";
                }
                responseCallback({'msg': msg});
            });
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
            console.log(err);
        }
    });

    spark.on('sell', function (sellCommand, responseCallback) {
        try {
            db_helper.getPerson(db_user, Person, sellCommand.u, function (person) {
                var msg = "";
                var idx = sellCommand.sell - 1;
                var location = person.currentLocation;
                var field = person.playfield[location.x][location.y];
                if (field && field.type === FieldType.STORE) {
                    if (idx < person.items.length) {
                        //delete item from bag and add gold to person
                        person.gold += person.items[idx].price / 2;
                        person.items.splice(idx, 1);
                        msg = "You sell the item!";
                        db_helper.updatePerson(db_user, person, function (update_result) {
                            if (update_result.update_person_answer == "success") {
                                responseCallback({
                                    'msg': msg
                                });
                            }
                        });
                    } else {
                        msg = "Bad item id!";
                    }
                } else {
                    msg = "You must be in STORE to use this command.";
                }
                responseCallback({'msg': msg});
            });
        } catch (err) {
            responseCallback({
                'msg': "Server error."
            });
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
                        responseCallback({'login_answer': 'success'});
                    }
                    else {
                        responseCallback({'login_answer': 'bad'});
                    }
                }
                else {
                    var new_person = new Person(data.u, playfield);
                    new_person.initialize_position();
                    var us = db_helper.per2us(db_user, data, new_person);
                    us.save(function (err, us) {
                        if (err) {
                            responseCallback({'login_answer': 'error'});
                            return console.error(err);
                        }
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

    spark.on('sleep_person_start', function (data, responseCallback) {
        db_helper.sleepPersonStart(db_user, data.person_name, responseCallback);
    });

    spark.on('add_health', function (data, responseCallback) {
        db_helper.addHealth(Person, db_helper, db_user, data.person_name, responseCallback);
    });

    spark.on('get_highscores', function (data, response_callback) {
        highscores.get_highscores(function (highscores) {
            response_callback({'highscores': highscores});
        })
    });

    spark.on('get_config', function (_data, response_callback) {
        response_callback({'config': highscores.get_config()});
    });


});

server.listen(8080);
console.log('8080 is where the magic happens');
