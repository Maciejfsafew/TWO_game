/**
 * Simple console.log test. (awaiting for testing framework)
 * @type {exports}
 */
var experienceManager = require("./experienceManager");

var Monster = function Monster(name) {
    this.name = name;
    this.strength = Math.floor((Math.random() * 100) + 1);
    this.dexterity = Math.floor((Math.random() * 100) + 1);
    this.hp = Math.floor((Math.random() * 1000) + 1);
    this.maxhp = this.hp + 20;
};


var Person = function Person(name) {
    this.name = name;
    this.strength = 100;
    this.dexterity = 100;
    this.hp = 100;
    this.maxhp = 120;
    this.experience = 0;
    this.level = 1;
};

var person = new Person("bohater");
var monster = new Monster("potwor");
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);
experienceManager.addExperience(person, monster);
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);
experienceManager.levelDownCharacter(person);
console.log("Character level: " + person.level);
console.log("Character's experience: " + person.experience);


