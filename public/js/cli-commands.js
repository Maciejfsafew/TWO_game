// Example commands
var primus = Primus.connect();

var Commands = [
    {
        name: "map",
        api: "map",
        customCallback: function (data) {
            return 'map will be drawed here from ' + data;
        }
    },
    {
        name: "north",
        alias: "n",
        msg: "You're going north."
    },
    {
        name: "south",
        alias: "s",
        msg: "You're going south."
    },
    {
        name: "west",
        alias: "w",
        msg: "You're going west."
    },
    {
        name: "east",
        alias: "e",
        msg: "You're going east."
    },
    {
        name: "up",
        alias: "u",
        msg: "You're going up."
    },
    {
        name: "down",
        alias: "d",
        msg: "You're going down."
    },
    {
        name: "pause",
        api: "pause",
        msg: 'Please, answer the alert',
        customCallback: function (data) {
            if (confirm("Do you want to exit?")) {
                logout();
            }
        }
    },
    {
        name: "sleep",
        api: "sleep",
        msg: "Your hp is growing up now. Type 'wakeup' to wake up",
        customCallback: function (data) {
            if (window.person.sleep === true) {
                window.alert('You are already sleep');
                return;
            }
            window.person.sleep = true;
            primus.write({'action': 'update_person', 'person': window.person});
            primus.on('data', function message(data) {
                var update_person_answer = data.update_person_answer;
                if (update_person_answer === 'error') {
                    window.alert('Sleep error');
                }
                else if (update_person_answer === 'success') {
                    window.myInterval = setInterval(function () {
                        if (window.person.hp + 5 <= window.person.maxhp) {
                            window.person.hp += 5;
                        }
                        primus.write({'action': 'update_person', 'person': window.person});
                        primus.on('data', function message(data) {
                            var update_person_answer = data.update_person_answer;
                            if (update_person_answer === 'error') {
                                window.alert('Sleep error');
                            }
                            else if (update_person_answer === 'success') {
                                //ignore
                            }
                        });
                    }, 5000);
                }
            });
        }
    },
    {
        name: "wakeup",
        api: "wakeup",
        msg: 'You can do whatever you want again',
        customCallback: function (data) {
            if (window.person.sleep === false) {
                window.alert('You are already awake');
                return;
            }
            window.person.sleep = false;
            primus.write({'action': 'update_person', 'person': window.person});
            primus.on('data', function message(data) {
                var update_person_answer = data.update_person_answer;
                if (update_person_answer === 'error') {
                    window.alert('Wake up error');
                }
                else if (update_person_answer === 'success') {
                    clearInterval(window.myInterval);
                }
            });
        }
    }
];
