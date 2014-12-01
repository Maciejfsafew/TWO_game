/**
 * Simple console.log test. (awaiting for testing framework)
 * @type {exports}
 */
var experienceManager = require("./experienceManager");
var Person = require("../person");
var generateMonster = require("../../../monsters/monsters");

var Monster = function Monster(name) {
    this.name = name;
    this.strength = Math.floor((Math.random() * 100) + 1);
    this.dexterity = Math.floor((Math.random() * 100) + 1);
    this.hp = Math.floor((Math.random() * 1000) + 1);
    this.maxhp = this.hp + 20;
};

var person = new Person("bohater");
//var monster = new Monster("potwor");
person.currentField = FieldType.MONSTER;

var monster = generateMonster(person, 1);


console.log("~~~~ Init: ")
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);
experienceManager.addExperience(person, monster);
console.log("~~~~ After won fight with the monster: ")
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);
experienceManager.levelDownCharacter(person);
console.log("~~~~ After leveling down: ")
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);


