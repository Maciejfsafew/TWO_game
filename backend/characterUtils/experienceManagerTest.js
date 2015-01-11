/**
 * Simple console.log test. (awaiting for testing framework)
 * @type {exports}
 */
var experienceManager = require("./experienceManager");
var Person = require("../person");
var generateMonster = require("../../../monsters/monsters").generateMonster;

var person = new Person("bohater");

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


