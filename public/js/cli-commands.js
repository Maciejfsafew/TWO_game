// Example commands
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
            // TODO: replace, client haven't window.person object
            //window.person.currentLocation = server_response.location;
            setUpUserInfo(server_response.person);
            updateLocation();
            if (server_response.is_dead)
                window.alert("Unfortunately, you died. Try again from start!");
        }
    },
    {
        name: "answer",
        msg: "",
        alias: "ans",
        args_handler: function (args) {
            var msg = {success: false, msg: "No answer given!"};
            if (args.length > 0) {
                var parsedArgs = [];
                args.forEach(function (element, index) {
                    var parsed = parseInt(element);
                    if (!parsed || !isNaN(parsed)) {
                        parsedArgs.push(parsed);
                    } else {
                        return msg
                    }
                });
                msg = {success: true, msg: {answer: parsedArgs}}
            }
            return msg;
        },
        response_handler: function (server_response) {
            console.log(server_response);
            updateLocation();
        }
    },
    {
        name: "sleep",
        msg: "You are sleeping. Your health is recovering.",
        alias: "sleep",
        args_handler: function (args) {
            return {success: true, msg: ""} //Args handler validates only arguments
        },
        response_handler: function (server_response) {
            window.is_sleeping = true;
            primus.send('sleep_person_start', {'person_name': $.cookie("name")}, function (data) {
                var sleep_person_start_answer = data.sleep_person_start_answer;
                console.log(sleep_person_start_answer);
                if (sleep_person_start_answer === 'error') {
                    window.alert('Sleep error');
                }
                else if (sleep_person_start_answer === 'success') {
                    window.myInterval = setInterval(function () {
                        primus.send('add_health', {'person_name': $.cookie("name")}, function (data) {
                            var add_health_answer = data.add_health_answer;
                            if (add_health_answer === 'error') {
                                window.alert('Sleep error');
                            }
                            else if (add_health_answer === 'success') {
                                updateHeight(data.person);
                            }
                            else if (add_health_answer === 'max') {
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
        msg: "You woke up.",
        alias: "wakeup",
        args_handler: function (args) {
            return {success: true, msg: ""} //Args handler validates only arguments
        },
        response_handler: function (server_response) {
            window.is_sleeping = false;
            clearInterval(window.myInterval);
        }
    },
    {
        name: "pause",
        alias: "pause",
        msg: 'Please, answer the alert',
        args_handler: function (args) {
            return {success: true, msg: window.person}//Args handler validates only arguments
        },
        response_handler: function (server_response) {
            if (confirm("Do you want to exit?")) {
                logout();
            }
        }
    },
    {
        name: "bag",
        alias: "b",
        msg: "",
        args_handler: function (args) {
            return {success: true, msg: ""} //Args handler validates only arguments
        }
    },
    {
        name: "highscores",
        alias: "hs",
        msg: "",
        args_handler: function (args) {
            window.open('/highscores', "_self");
            return {success: true, msg: ""}
        }
    },
    {
        name: "loot",
        alias: "l",
        msg: "",
        args_handler: function () {
            return {success: true, msg: ""}
        },
        response_handler: function () {
            updateLocation();
        }
    }
]
