var FieldType = require("./fieldTypes")

function Chest() {
    this.type = FieldType.CHEST;
    this.items = [];
    this.gold = 0;
}
Chest.prototype.toString = function () {
    return "Chest<" + this.items + ", gold: " + this.gold + ">";
};

module.exports = Chest;