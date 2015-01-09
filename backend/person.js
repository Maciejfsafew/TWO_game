var FieldType = require("./fieldTypes");

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
    this.levelDown = function () {
        if (this.level != 1)
            this.level--;
    }
    this.levelUp = function () {
        this.level++;
    }
    this.die = function () {
        this.levelDown();
        this.items = [];
        this.currentField = {type: FieldType.START};
        this.hp = this.maxhp;
        //window.alert("Unfortunately, you died. Try again from start!");
    }
};

module.exports = Person;