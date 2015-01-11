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
        name: "sleep",
        msg: "You are sleeping. Your health is recovering.",
        alias: "sleep",
        args_handler: function (args) {
            return {success: true, msg: ""} //Args handler validates only arguments
        },
        response_handler: function (server_response) {
            window.is_sleeping = true;
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
            return {success: true, msg: ""}
        }
    }
]
