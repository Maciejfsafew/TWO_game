var FieldType = require("./fieldTypes")

function Quest() {
    this.type = FieldType.QUEST;
    this.activated = false;
    this.questnr = 0;
    this.finished = null;
}


module.exports = Quest


