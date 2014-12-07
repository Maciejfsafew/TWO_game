var Person = require("./public/js/person");
var Monster = require("./monsters/monsters");
var battle = require("./public/js/battle");

var person = new Person("Hero");
var monster = Monster.generateMonster(person, 1);

console.log((battle(person, monster, true, null) ? person.name : monster.name) + ' win!!!');