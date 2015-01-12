var FieldType = require("./fieldTypes")

function Forbidden() {
    this.type = FieldType.FORBIDDEN;
}

Forbidden.prototype.toString = function() {
    return "X";
};

module.exports = Forbidden