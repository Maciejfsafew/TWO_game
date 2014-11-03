/**
 * Created by student on 2014-11-03.
 */

var experiencePerLevel = [100, 500, 1500, 3000, 4500, 7000, 10000];

function addExperience(character, monster) {

    var expToAdd = countExperienceFromMonster(monster);

    addExperienceToCharacter(character, expToAdd);

}

function countExperienceFromMonster(monster) {
    return (monster.strength + monster.dexterity)*10 + monster.maxHP;
}

function addExperienceToCharacter(character, expToAdd) {

    character.experience += expToAdd;

    // Checks if character gained level.
    while (character.experience >= experiencePerLevel[character.level-1]) {
        levelUpCharacter(character);
    }
}

function levelUpCharacter(character) {
    character.level++;
    character.maxHP += 20;
    character.HP = character.maxHP;
    character.strength += 2;
    character.dexterity += 2;
}