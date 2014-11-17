(function(root, $, _, primus) {
  Josh.Example = (function(root, $, _, primus) {

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
        callback("[" + n + " " + time + "] $ ");
    });

    // Example of defining commands. When REST api will be ready
    // all communication will happen here.
    // Commands defined in cli-commands.js
    Commands = [
        {
            name: "move",
            rest: "rest",
            msg: "",
            alias: "mv",
            args_handler: function(args) {
              var msg = { success: false, msg: "Bad argument! Use N/S/E/W direction." };
              
              if(args.length == 1) {
                 var arg = args[0].toUpperCase();
                  if(arg === "N" || arg === "E" || arg === "S" || arg === "W") {
                      msg = { success: true, msg: {move: arg} }
                  }
              }  
              return msg;
            }
        }
    ]

    Commands.forEach(function(entry) {
      var name = entry.name;
      var rest = entry.rest;
      var msg = entry.msg;
      var alias = entry.alias;
      var args_handler = entry.args_handler;

      var handler = {
        exec: function(cmd, args, callback) {
          var response = "";
          
          var status = args_handler(args);
          if (status.success === true) {
              primus.write({ command: "move", msg: status.msg });
              console.log("SENDING:");
              console.log(status);
              primus.on("data", function(data) {
                  console.log("RECEIVED on move:");
                  console.log(data);
                  msg = data;
                  response += msg;
                  callback(response);
              });
          } else {
              msg = status.msg;
              response += msg;
              callback(response);
          }          
        }
      };

      shell.setCommandHandler(name, handler);
      if(alias) {
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
