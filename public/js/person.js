var Person = function Person(name) {
    this.name = name;
    this.strength = 100;
    this.dexterity = 100;
    this.hp = 100;
    this.level = 1;
    this.maxhp = this.hp;
    this.items = [];
};

module.exports = Person;