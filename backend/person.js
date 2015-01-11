var FieldType = require("./fieldTypes");
var expMan = require('./characterUtils/experienceManager');

var Person = function Person(name) {
    this.name = name;
    this.strength = 2;
    this.dexterity = 2;
    this.hp = 100;
    this.maxhp = this.hp;
    this.level = 1;
    this.experience = 0;
    this.items = [];
    this.currentField = {type: FieldType.START};
    this.sleep = false;
    this.levelDown = function () {
        expMan.levelDownCharacter(this);
    };
    this.die = function () {
        this.levelDown();
        this.items = [];
        this.currentField = {type: FieldType.START};
        this.hp = this.maxhp;
        //window.alert("Unfortunately, you died. Try again from start!");
    }
    this.playfield = undefined;
    this.currentLocation = {x: -1, y: -1};
};

module.exports = Person;