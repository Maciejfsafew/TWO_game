module.exports = function battle(hero, monster, first_run, hero_next_turn, str) {
    if (hero.hp <= 0) {
        return {'result': false, 'str': str};
    }
    if (monster.hp <= 0) {
        return {'result': true, 'str': str};
    }
    var damage;
    if (first_run) {
        var rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            str = print_to_string(hero, monster, damage, str);
            monster.hp -= damage;
            check_hp(monster);
            return battle(hero, monster, false, false, str);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            str = print_to_string(monster, hero, damage, str);
            hero.hp -= damage;
            check_hp(hero);
            return battle(hero, monster, false, true, str);
        }
    }
    if (hero_next_turn != null) {
        if (hero_next_turn) {
            damage = get_damage(hero);
            print_on_console(hero, monster, damage);
            str = print_to_string(hero, monster, damage, str);
            monster.hp -= damage;
            check_hp(monster);
            return battle(hero, monster, false, false, str);
        }
        else {
            damage = get_damage(monster);
            print_on_console(monster, hero, damage);
            str = print_to_string(monster, hero, damage, str);
            hero.hp -= damage;
            check_hp(hero);
            return battle(hero, monster, false, true, str);
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

function get_info(attacker, damaged, hp) {
    return attacker.name + get_attributes(attacker) + ' has damaged (' + hp + 'hp) ' + damaged.name
        + get_attributes(damaged);
}

function print_on_console(attacker, damaged, hp) {
    console.log(get_info(attacker, damaged, hp));
}

function print_to_string(attacker, damaged, hp, str) {
    return str + "<br>" + get_info(attacker, damaged, hp);
}

function get_attributes(person) {
    return ' (hp: ' + person.hp + ', strength: ' + person.strength + ', dexterity: ' + person.dexterity + ')';
}