var FieldType = require("./fieldTypes")

function Path() {
    this.type = FieldType.PATH;
}
Path.prototype.toString = function() {
    return "_";
};

module.exports = Path


