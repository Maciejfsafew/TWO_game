var Person = require("./public/js/person");
var Monster = require("./monsters/monsters");
var battle = require("./public/js/battle");

var person = new Person("Hero");
var monster = Monster.generateMonster(person, 1);

var battle_result = battle(person, monster, true, null);

console.log((battle_result ? person.name : monster.name) + ' win!!!');

if (!battle_result) {
    person.die();
}