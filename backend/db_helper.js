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
            user.currentField = person.currentField;
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

exports.us2per = function (Person, user) {
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
        currentField: person.currentField
    });
};