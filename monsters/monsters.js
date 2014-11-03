function Monster(monsterConfiguration) {
    this.name = monsterConfiguration.name;
    this.description = monsterConfiguration.description;
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
        strength: 10,
        dexterity: 2,
        hp: 100,
        maxhp: 100,
        items: []
    },
    {
        name: "Rogue",
        description: "Fast but small hp pool.",
        strength: 2,
        dexterity: 10,
        hp: 30,
        maxhp: 30,
        items: []
    }
];
function generateMonster(hero, map) {
    //hero - zeby wiedziec gdzie wszedl, map - zeby wiedziec czy pole jest puste
    return new Monster(monsterConfig[Math.floor(Math.random() * monsterConfig.length)]);
}