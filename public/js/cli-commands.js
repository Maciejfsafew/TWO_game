var Items = require("./public/js/items");
// Example commands
var Commands = [
  {
    name: "move",
    msg: "",
    alias: "mv",
    args_handler: function(args) {
      var msg = { success: false, msg: "Bad argument! Use N/S/E/W direction." };
      console.log(args);
      if(args.length == 1) {
        var arg = args[0].toUpperCase();
        if(arg === "N" || arg === "E" || arg === "S" || arg === "W") {
          msg = { success: true, msg: {move: arg} }
        }
      }
      return msg;
    }
  },
  {
    name: "map",
    api: "map",
    args_handler: function(data) {
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
    args_handler: function (data) {
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
        return { success: true, msg: Items.showBag(window.Person) }
    }
  }
]
