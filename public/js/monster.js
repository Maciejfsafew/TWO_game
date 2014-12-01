var FieldType = require("./fieldTypes")

function Monster() {
    this.type = FieldType.MONSTER;
}

Monster.prototype.toString = function() {
    return "Monster";
};

module.exports = Monster;