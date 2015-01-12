module.exports = function battle(hero, monster, first_run, hero_next_turn) {
    if (hero.hp <= 0) {
        return false;
    }
    if (monster.hp <= 0) {
        return true;
    }
    var damage;
    if (first_run) {
        var rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            monster.hp -= damage;
            check_hp(monster);
            return battle(hero, monster, false, false);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            hero.hp -= damage;
            check_hp(hero);
            return battle(hero, monster, false, true);
        }
    }
    if (hero_next_turn != null) {
        if (hero_next_turn) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            monster.hp -= damage;
            check_hp(monster);
            return battle(hero, monster, false, false);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            hero.hp -= damage;
            check_hp(hero);
            return battle(hero, monster, false, true);
        }
    }
    else {
        return null;
    }
};

function get_damage(person) {
    return person.dexterity * 0.5 + person.strength * 0.5
}

function check_hp(person) {
    person.hp = person.hp < 0 ? 0 : person.hp;
}

function print_on_console(attacker, damaged, hp) {
    console.log(attacker.name + get_attributes(attacker) + ' has damaged (' + hp + 'hp) ' + damaged.name
    + get_attributes(damaged));
}

function get_attributes(person) {
    return ' (hp: ' + person.hp + ', strength: ' + person.strength + ', dexterity: ' + person.dexterity + ')';
}