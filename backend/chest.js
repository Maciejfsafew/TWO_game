var FieldType = require("./fieldTypes");

function Chest() {
    this.type = FieldType.CHEST;
    this.items = [];
    this.gold = Math.floor((Math.random() * 2000));
    this.looted = false;
}
Chest.prototype.toString = function () {
    return "Chest<" + this.items + ", gold: " + this.gold + ">";
};

module.exports = Chest;