var FieldType = require("./fieldTypes")


function Start() {
    this.type = FieldType.START;
}

Start.prototype.toString = function() {
    return "Start";
};

module.exports = Start