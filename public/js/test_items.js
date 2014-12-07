var Person = require("./person");
var Items = require("./items");

var person = new Person("Hero");
//generate item
var item = Items.generateItem();
//add item to bag
person.items.push(item);
//display bag content
Items.showBag(person);