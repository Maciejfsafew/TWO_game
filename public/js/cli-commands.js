// Example commands
var primus = Primus.connect();

var Commands = [
    {
        name: "move",
        msg: "",
        alias: "mv",
        args_handler: function (args) {
            var msg = {success: false, msg: "Bad argument! Use N/S/E/W direction."};
            if (args.length == 1) {
                var arg = args[0].toUpperCase();
                if (arg === "N" || arg === "E" || arg === "S" || arg === "W") {
                    msg = {success: true, msg: {move: arg}}
                }
            }
            return msg;
        },
        response_handler: function (server_response) {
            window.person.currentLocation = server_response.location;
        }
    },
    {
        name: "map",
        msg: "",
        alias: "map",
        args_handler: function (args) {
            return {success: true, msg: ""} //Args handler validates only arguments
        },
        response_handler: function (server_response) {
            console.log(server_response);
        }
    },
    {
        name: "pause",
        alias: "pause",
        msg: 'Please, answer the alert',
        args_handler: function (args) {
            return {success: true, msg: ""}//Args handler validates only arguments
        }
    },
    {
<<<<<<< HEAD
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
=======
        name: "bag",
        alias: "b",
        msg: "",
        args_handler: function (args) {
            return {success: true, msg: ""}
        }
    }
]
>>>>>>> master
