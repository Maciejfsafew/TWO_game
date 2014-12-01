var FieldType = require("./fieldTypes")

function FinalBoss() {
    this.type = FieldType.FINAL_BOSS;
}

FinalBoss.prototype.toString = function() {
    return "Boss";
};

module.exports = FinalBoss