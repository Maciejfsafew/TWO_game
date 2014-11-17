var Monster = function Monster(name) {
    this.name = name;
    this.strength = Math.floor((Math.random() * 200) + 1);
    this.dexterity = Math.floor((Math.random() * 200) + 1);
    this.hp = Math.floor((Math.random() * 200) + 1);
    this.description = '';
    this.level = 1;
    this.maxhp = this.hp;
    this.items = [];
};

module.exports = Monster;