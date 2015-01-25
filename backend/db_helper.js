exports.updatePerson = function (db_user, person, responseCallback) {
    db_user.findOne({'username': person.name}, function (err, user) {
        if (err) {
            responseCallback({'update_person_answer': 'error', 'msg': ''});
            return console.error(err);
        }
        if (user != null) {
            user.strength = person.strength;
            user.dexterity = person.dexterity;
            user.hp = person.hp;
            user.maxhp = person.maxhp;
            user.level = person.level;
            user.experience = person.experience;
            user.items = person.items;
            user.currentLocation = person.currentLocation;
            user.playfield = person.playfield;
            user.gold = person.gold;
            user.attackedMonsters = person.attackedMonsters;
            user.completedQueezes = person.completedQueezes;
            user.completedQuests = person.completedQuests;
            user.save(function (err, us) {
                if (err) {
                    responseCallback({'update_person_answer': 'error', 'msg': ''});
                    return console.error(err);
                }
                responseCallback({'update_person_answer': 'success', 'msg': ''});
            });
        }
        else {
            responseCallback({'update_person_answer': 'error', 'msg': ''});
        }
    })
};

exports.sleepPersonStart = function (db_user, person_name, responseCallback) {
    db_user.findOne({'username': person_name}, function (err, user) {
        if (err) {
            responseCallback({'sleep_person_start_answer': 'error', 'msg': ''});
            return console.error(err);
        }
        if (user != null) {
            user.sleep_start = new Date();
            user.save(function (err, us) {
                if (err) {
                    responseCallback({'sleep_person_start_answer': 'error', 'msg': ''});
                    return console.error(err);
                }
                responseCallback({'sleep_person_start_answer': 'success', 'msg': ''});
            });
        }
        else {
            responseCallback({'sleep_person_start_answer': 'error', 'msg': ''});
        }
    })
};

exports.addHealth = function (Person, db_helper, db_user, person_name, responseCallback) {
    db_user.findOne({'username': person_name}, function (err, user) {
        if (err) {
            responseCallback({'add_health_answer': 'error', 'msg': ''});
            return console.error(err);
        }
        if (user != null) {
            var currDate = new Date();
            var oldDate = user.sleep_start;
            var timeDiff = Math.abs(currDate.getTime() - oldDate.getTime());
            var diffSeconds = Math.floor(timeDiff / 1000);
            if (user.hp === user.maxhp) {
                responseCallback({'add_health_answer': 'max', 'msg': ''});
            }
            else if ((diffSeconds + user.hp) <= user.maxhp) {
                user.hp += diffSeconds;
                user.sleep_start = currDate;
                user.save(function (err, us) {
                    if (err) {
                        responseCallback({'add_health_answer': 'error', 'msg': ''});
                        return console.error(err);
                    }
                    responseCallback({
                        'add_health_answer': 'success',
                        'msg': '',
                        'person': db_helper.us2per(Person, user)
                    });
                });
            }
            else {
                user.hp = user.maxhp;
                user.sleep_start = currDate;
                user.save(function (err, us) {
                    if (err) {
                        responseCallback({'add_health_answer': 'error', 'msg': ''});
                        return console.error(err);
                    }
                    responseCallback({
                        'add_health_answer': 'success',
                        'msg': '',
                        'person': db_helper.us2per(Person, user)
                    });
                });
            }
        }
        else {
            responseCallback({'add_health_answer': 'error', 'msg': ''});
        }
    })
};

exports.us2per = function (Person, user) {
    var person = new Person(user.username);
    person.strength = user.strength;
    person.dexterity = user.dexterity;
    person.hp = user.hp;
    person.maxhp = user.maxhp;
    person.level = user.level;
    person.expPerLevel = person.countExpPerLevel();
    person.experience = user.experience;
    person.items = user.items;
    person.currentLocation = user.currentLocation;
    person.playfield = user.playfield;
    person.gold = user.gold;
    person.attackedMonsters = user.attackedMonsters;
    person.completedQueezes = user.completedQueezes;
    person.completedQuests = user.completedQuests;
    return person;
};

exports.per2us = function (db_user, data, person) {
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
        currentLocation: person.currentLocation,
        playfield: person.playfield,
        gold: person.gold,
        attackedMonsters: person.attackedMonsters,
        completedQueezes: person.completedQueezes,
        completedQuests: person.completedQuests
    });
};

exports.getPerson = function (db_user, Person, username, callback) {
    db_user.findOne({'username': username}, function (err, user) {
        if (user != null) {
            callback(exports.us2per(Person, user))
        }
    });
};