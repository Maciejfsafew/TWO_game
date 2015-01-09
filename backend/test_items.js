var Person = require("./public/js/Person");
var Items = require("./public/js/items");
var Monster = require("./monsters/monsters");

var person = new Person("Hero");
//generate item
var item = Items.generateItem();
//add item to bag
person.items.push(item);
item = Items.generateItem();
person.items.push(item);
//display bag content
Items.showBag(person);
Items.updateStats(person);
console.log(person);

console.log("\n\n");
var monster = Monster.generateMonster(person, 1);
console.log(monster);
item = Items.generateItem();
monster.items.push(item);
Items.updateStats(monster);
console.log(monster);

console.log("\n\n");
person.items = [];
Items.updateStats(person);
console.log(person);