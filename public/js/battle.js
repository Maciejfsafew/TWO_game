module.exports = function battle(hero, monster, first_run, hero_next_turn) {
    if (hero.health <= 0) {
        return false;
    }
    if (monster.health <= 0) {
        return true;
    }
    var damage;
    if (first_run) {
        var rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            monster.health -= damage;
            check_health(monster);
            return battle(hero, monster, false, false);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            hero.health -= damage;
            check_health(hero);
            return battle(hero, monster, false, true);
        }
    }
    if (hero_next_turn != null) {
        if (hero_next_turn) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            monster.health -= damage;
            check_health(monster);
            return battle(hero, monster, false, false);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            hero.health -= damage;
            check_health(hero);
            return battle(hero, monster, false, true);
        }
    }
    else {
        return null;
    }
};

function get_damage(person) {
    return person.skill * 0.5 + person.power * 0.5
}

function check_health(person) {
    person.health = person.health < 0 ? 0 : person.health;
}

function print_on_console(attacker, damaged, hp) {
    console.log(attacker.name + get_attributes(attacker) + ' has damaged (' + hp + 'hp) ' + damaged.name
    + get_attributes(damaged));
}

function get_attributes(person) {
    return ' (health: ' + person.health + ', power: ' + person.power + ', skill: ' + person.skill + ')';
}