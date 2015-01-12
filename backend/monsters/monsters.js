var FieldType = require("../fieldTypes");

function Monster(monsterConfiguration) {
    this.name = monsterConfiguration.name;
    this.description = monsterConfiguration.description;
    this.level = monsterConfiguration.level;
    this.strength = monsterConfiguration.strength;
    this.dexterity = monsterConfiguration.dexterity;
    this.hp = monsterConfiguration.hp;
    this.maxhp = monsterConfiguration.maxhp;
    this.items = monsterConfiguration.items.slice(0);
    this.gold = Math.floor((Math.random() * 200) + 100);
}
var monsterDefinitions = require("./monsterDefinitions.json");
exports.generateMonster = function (hero, probability) {
    //hero - Must contain currentField property. Probability is of monster generation.
    if (!containsMonster(hero.currentField)) {
        if (Math.random() <= probability) {
            var monstersFilteredByLevel = monsterDefinitions.filter(function (monster) {
                return monster.level <= hero.level;
            });
            if (monstersFilteredByLevel.length === 0) {
                monstersFilteredByLevel = monsterDefinitions
            }
            return new Monster(monstersFilteredByLevel[Math.floor(Math.random() * monstersFilteredByLevel.length)]);
        }
    }
    return null;
};


function containsMonster(field) {
    return field && (field.type === FieldType.MONSTER) && field.monster; // field should probably be able do contain a monster object
}