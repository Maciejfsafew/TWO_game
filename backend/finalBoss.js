var FieldType = require("./fieldTypes")

function FinalBoss() {
    this.type = FieldType.BOSS;
}

FinalBoss.prototype.toString = function() {
    return "Boss";
};

module.exports = FinalBoss