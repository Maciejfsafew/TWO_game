var FieldType = require("./fieldTypes")
var questDefinitions = require("./questDefinitions.json");

exports.getQuest = function (person) {
    var location = person.currentLocation;
    var field = person.playfield[location.x][location.y];

    if(field && field.type === FieldType.QUEST){
        if(field.finished) {
            return null;
        }

        if(field.activated == false) {
            field.questNr = Math.floor(Math.random() * questDefinitions.length);
            var new_quiz = questDefinitions[field.questNr];
            //console.log(new_quiz);
            field.activated = true;
            return new_quiz.task;
        } else {
            var verify = function (requirements, person) {
                var ok = true;
                requirements.forEach(function(entry) {
                    if(person[entry[0]] < entry[1])
                        ok = false;
                    //console.log(["requirement_failed", entry, person[entry[0]]]);
                });
                if(ok) {
                    requirements.forEach(function(entry) {
                        person[entry[0]] -= entry[1];
                    });
                }
                return ok;
            };
            if(verify(questDefinitions[field.questNr].required, person)) {
                field.finished = true;
                questDefinitions[field.questNr].reward.forEach(function(entry) {
                    person[entry[0]] += entry[1];
                    //console.log(person);
                });
                person.completedQuests += 1;
                return questDefinitions[field.questNr].success;
            } else {
                return questDefinitions[field.questNr].notYet;
            }
        }
    }
    return null;
}