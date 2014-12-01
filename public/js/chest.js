var FieldType = require("./fieldTypes")

function Chest() {
    this.type = FieldType.CHEST;
    this.items = [];
}
Chest.prototype.toString = function () {
    return "Chest<" + this.items + ">";
};

module.exports = Chest;