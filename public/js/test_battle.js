var Person = require("./public/js/person");
var Monster = require("./public/js/monster");
var battle = require("./public/js/battle");

var person = new Person("Hero");
var monster = new Monster("Bad Boy");

console.log((battle(person, monster, true, null) ? person.name : monster.name) + ' win!!!');