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
    this.gold = monsterConfiguration.gold;
}
var monsterDefinitions = require("./monsterDefinitions.json");
exports.generateMonster = function (hero, probability, isSmaug) {
    //hero - Must contain currentField property. Probability is of monster generation.
    if(isSmaug)
    {
        return new Monster(monsterDefinitions[monsterDefinitions.length - 1]);
    }
    if (Math.random() <= probability) {
        var monstersFilteredByLevel = monsterDefinitions.filter(function (monster) {
            return monster.level <= hero.level && monster.name != "Smaug";
        });
        if (monstersFilteredByLevel.length === 0) {
            monstersFilteredByLevel = monsterDefinitions
        }
        return new Monster(monstersFilteredByLevel[Math.floor(Math.random() * Math.min(monstersFilteredByLevel.length, monsterDefinitions.length - 1 ))]);
    }
};
