// TODO
// 1. Unrecognized command handleer
// 2. API, parameterized PROMPT (with str, hp, mana etc)
// 3. colors (+API)
// 4. MOTD in API

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
    shell.onNewPrompt(function(callback) {
        callback("[" + n+ " " + time + "] $ ");
    });


    // North command
    // TODO aliases, extract commands to diffrent file
    shell.setCommandHandler("north", {
      exec: function(cmd, args, callback) {
	response = "You're going north";
        callback(response);
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
  })(root, $, _);
})(this, $, _);
