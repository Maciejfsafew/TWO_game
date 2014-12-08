(function (root, $, _) {
    Josh.Example = (function (root, $, _) {

        var _console = (Josh.Debug && root.console) ? root.console : {
            log: function () {
            }
        };

        var primus = Primus.connect();

        var history = Josh.History();
        var readline = new Josh.ReadLine({history: history, console: _console});
        var shell = Josh.Shell({readline: readline, history: history, console: _console});


        shell.onNewPrompt(function (callback) {
            // Prompt
            var date = new Date();
            var n = date.toDateString();
            var time = date.toLocaleTimeString();
            callback("[" + n + " " + time + "] $ ");
        });

        // Example of defining commands. When REST api will be ready
        // all communication will happen here.
        // Commands defined in cli-commands.js

        Commands.forEach(function (entry) {
            var name = entry.name;
            var api = entry.api;
            var msg = entry.msg;
            var alias = entry.alias;
            var customCallback = entry.customCallback;

            var handler = {
                exec: function (cmd, args, callback) {
                    var response = "";
                    if (api) {
                        primus.write(api);
                        primus.on('data', function (data) {
                            if (customCallback) {
                                /*response += */customCallback(data);
                            }
                        });
                    }
                    response += msg;
                    callback(response);
                }
            };

            shell.setCommandHandler(name, handler);
            if (alias) {
                shell.setCommandHandler(alias, handler);
            }

        });

        $(root).ready(function () {

            shell.activate();

            var $consolePanel = $('#shell-panel');
            $consolePanel.resizable({handles: "s"});
            $(document).keypress(function (event) {
                if (shell.isActive()) {
                    return;
                }

                shell.activate();
            });
        });

        Josh.Instance = {
            Shell: shell
        };
    })(root, $, _);
})(this, $, _);
