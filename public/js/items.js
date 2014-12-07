function rand (min, max) {
var argc = arguments.length;
    if (argc === 0) {
        min = 1;
        max = 5;    } else if (argc === 1) {
        throw new Error('Need to input both arguments min and max');
    }
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Item(itemsConfiguration, attribute, value) {
    this.id = itemsConfiguration.id;
    this.name = itemsConfiguration.name;
    this.description = itemsConfiguration.description;
    this.attribute = attribute;
    this.value = value;
}

var itemDefinitions = require("./itemDefinitions.json");
exports.generateItem = function () {
    var itemsFilteredById = itemDefinitions.filter(function (item) {
        return item.id === rand(1, 8);
    });
    if (itemsFilteredById.length === 0) {
        itemsFilteredById = itemDefinitions
    }
    var tmp = rand(1, 3);
    if (tmp === 1) {
        attr = "strength";
    }
    if (tmp === 2) {
        attr = "dexterity";
    }
    if (tmp === 3) {
        attr = "hp";
    }
    return new Item(itemsFilteredById[0], attr, rand());
};

exports.showBag = function (hero){
    hero.items.forEach(function(it){
        console.log(".:: "+ it.name +" ::.");
        console.log(it.description);
        console.log("+"+it.value +" " +it.attribute+"\n");
    });
}