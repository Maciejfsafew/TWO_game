/**
 * Class for adding experience and leveling up character.
 */
    
var experiencePerLevel = [100, 500, 1500, 3000, 4500, 7000, 10000];

function addExperience(character, monster) {

    var expToAdd = countExperienceFromMonster(monster);

    addExperienceToCharacter(character, expToAdd);

}

function countExperienceFromMonster(monster) {
    return (monster.strength + monster.dexterity)*10 + monster.maxhp;
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
    character.maxhp += 20;
    character.hp = character.maxhp;
    character.strength += 2;
    character.dexterity += 2;
}

function leveDownCharacter(character) {
    character.level--;
    var experience;
    if (character.level - 1 < 0) {
        experience = 0;
    } else {
        experience = experiencePerLevel[level - 2];
    }
    character.experience = experience;
    character.maxhp -= 20;
    character.hp = character.maxhp;
    character.strength -= 2;
    character.dexterity -= 2;
}