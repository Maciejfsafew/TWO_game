var FieldType = require("./fieldTypes");
var expMan = require('./characterUtils/experienceManager');
var map = require("./map");

var Person = function Person(name, playfield) {
    this.name = name;
    this.strength = 2;
    this.dexterity = 2;
    this.hp = 100;
    this.maxhp = this.hp;
    this.level = 1;
    this.experience = 0;
    this.items = [];
    this.gold = 0;
    this.attackedMonsters = 0;
    this.completedQueezes = 0;
    this.completedQuests = 0;
    this.levelDown = function () {
        expMan.levelDownCharacter(this);
    };
    this.die = function () {
        this.levelDown();
        this.currentLocation = {'x':1, 'y':1};
        this.items = [];
        this.gold = 0;
        this.hp = this.maxhp;
        //window.alert("Unfortunately, you died. Try again from start!");
    }
    this.playfield = playfield;
    this.currentLocation = {x: -1, y: -1};

    this.initialize_position = function() {
        var start_location = map.getStartField(playfield);
        this.currentLocation = {x: start_location[0], y: start_location[1]};
    }
};

module.exports = Person;