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
            primus.write({'action': 'sleep_person', 'person': window.person});
            primus.on('data', function message(data) {
                var sleep_person_answer = data.sleep_person_answer;
                if (sleep_person_answer === 'error') {
                    window.alert('Sleep error');
                }
                else if (sleep_person_answer === 'success') {
                    //ignore
                }
            });
        }
    },
    {
        name: "wakeup",
        api: "wakeup",
        msg: 'You can do whatever you want again',
        customCallback: function (data) {
            if (confirm("Do you want to exit?")) {
                logout();
            }
        }
    }
];
