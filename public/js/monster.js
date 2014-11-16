var Monster = function Monster(name) {
    this.name = name;
    this.power = Math.floor((Math.random() * 100) + 1);
    this.skill = Math.floor((Math.random() * 100) + 1);
    this.health = Math.floor((Math.random() * 1000) + 1);
};

module.exports = Monster;