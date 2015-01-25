var FieldType = require("./fieldTypes")

function Store() {
    this.type = FieldType.STORE;
}
Store.prototype.toString = function() {
    return "Store";
};

module.exports = Store