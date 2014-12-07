// Example commands
var Commands = [
  {
    name: "map",
    api: "map",
    customCallback: function(data) {
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
]
