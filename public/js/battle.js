module.exports = function battle(root, hero, monster, first_run, hero_next_turn) {
    if (hero.health <= 0) {
        return false;
    }
    if (monster.health <= 0) {
        return true;
    }
    if (first_run) {
        var rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
            monster.health -= (hero.skill * 0.5 + hero.power * 0.5);
            return battle(root, hero, monster, false, false);
        }
        else {
            hero.health -= (monster.skill * 0.5 + monster.power * 0.5);
            return battle(root, hero, monster, false, true);
        }
    }
    if (hero_next_turn != null) {
        if (hero_next_turn) {
            monster.health -= (hero.skill * 0.5 + hero.power * 0.5);
            return battle(root, hero, monster, false, false);
        }
        else {
            hero.health -= (monster.skill * 0.5 + monster.power * 0.5);
            return battle(root, hero, monster, false, true);
        }
    }
    else {
        return null;
    }
};