var FieldType = require("./fieldTypes")

function Quest() {
    this.type = FieldType.QUEST;
}
Quest.prototype.toString = function() {
    return "_";
};

module.exports = Quest


