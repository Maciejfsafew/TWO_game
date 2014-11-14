function Monster(monsterConfiguration) {
    this.name = monsterConfiguration.name;
    this.description = monsterConfiguration.description;
    this.level = monsterConfiguration.level;
    this.strength = monsterConfiguration.strength;
    this.dexterity = monsterConfiguration.dexterity;
    this.hp = monsterConfiguration.hp;
    this.maxhp = monsterConfiguration.maxhp;
    this.items = monsterConfiguration.items.slice(0);
}
var monsterConfig = [
    {
        name: "Tank",
        description: "Tough but slow.",
        level: 7,
        strength: 10,
        dexterity: 2,
        hp: 100,
        maxhp: 100,
        items: []
    },
    {
        name: "Rogue",
        description: "Fast but small hp pool.",
        level: 2,
        strength: 2,
        dexterity: 10,
        hp: 30,
        maxhp: 30,
        items: []
    },
    {
        name: "Troll",
        description: "Not very strong, but can take a beating",
        level: 5,
        strength: 4,
        dexterity: 5,
        hp: 130,
        maxhp: 130,
        items: []
    }
];

function generateMonster(hero, probability) {
    //hero - zeby wiedziec gdzie wszedl, map - zeby wiedziec czy pole jest puste
    var currentField = hero.getCurrentField();
    if (!containsMonster(currentField)) {
        if (Math.random() <= probability) {
            var monstersFilteredByLevel = monsterConfig.filter(function (monster) {
                return monster.level <= hero.level;
            });
            if (monstersFilteredByLevel.length === 0) {
                monstersFilteredByLevel = monsterConfig
            }
            return new Monster(monstersFilteredByLevel[Math.floor(Math.random() * monstersFilteredByLevel.length)]);
        }
    }
    return null;
}


function containsMonster(field) {
    return field.type === FieldType.MONSTER && field.monster; // field should probably be able do contain a monster object
}