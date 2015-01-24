var FieldType = require("./fieldTypes")
var Items = require("./items");

function Chest() {
    this.type = FieldType.CHEST;
    this.items = generateItems();
    this.gold = Math.floor((Math.random() * 200));
    this.looted = false;
}

function generateItems() {
    var generatedItems = [];
    var itemCount = Math.floor(Math.random() * 2);
    for (var i=0;i<itemCount;i++) {
        generatedItems.push(Items.generateItem())
    }
    return generatedItems;
}
Chest.prototype.toString = function () {
    return "Chest<" + this.items + ", gold: " + this.gold + ">";
};

module.exports = Chest;