(function(root, $, _) {
  Josh.Example = (function(root, $, _) {

    var _console = (Josh.Debug && root.console) ? root.console : {
      log: function() {
      }
    };

    var history = Josh.History();
    var readline = new Josh.ReadLine({history: history, console: _console });
    var shell = Josh.Shell({readline: readline, history: history, console: _console});

    // Prompt
    var date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    shell.onNewPrompt(function(shellCallback) {
        shellCallback("[" + n + " " + time + "] $ ");
    });
    // all communication will happen here.
    // Commands defined in cli-commands.js

    Commands.forEach(function(entry) {
      var name = entry.name;
      var alias = entry.alias;
      var msg = entry.msg;
      var args_handler = entry.args_handler;

      var handler = {
        exec: function(cmd, args, shellCallback) {
          var status = args_handler(args);

          //If command valid
          if (status.success === true) {
              primus.send(name, status.msg, function(response) {
                  shellCallback(msg + response);
              });
          //If command invalid e.g. typo in command:
          } else {
              shellCallback(msg + status.msg);
          }
        }
      };

      shell.setCommandHandler(name, handler);
      if (alias) {
        shell.setCommandHandler(alias, handler);
      }

    });

    $(root).ready(function() {

      shell.activate();

      var $consolePanel = $('#shell-panel');
      $consolePanel.resizable({ handles: "s"});
      $(document).keypress(function(event) {
        if(shell.isActive()) {
          return;
        }

	      shell.activate();
      });
    });

    Josh.Instance = {
      Shell: shell
    };
  })(root, $, _, primus);
})(this, $, _, primus);
