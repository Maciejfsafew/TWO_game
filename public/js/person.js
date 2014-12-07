var FieldType = require("./fieldTypes");

var Person = function Person(name) {
    this.name = name;
    this.strength = 100;
    this.dexterity = 100;
    this.hp = 100;
    this.maxhp = this.hp;
    this.level = 1;
    this.experience = 0;
    this.items = [];
    this.currentField = { type:FieldType.MONSTER };
};

module.exports = Person;