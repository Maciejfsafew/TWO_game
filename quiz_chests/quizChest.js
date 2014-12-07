var FieldType = require("../public/js/fieldTypes.js");
var quizDefinitions = require("./quizDefinitions.json");
function Quiz(quizConfiguration) {
    var that = this;
    this.question = quizConfiguration.question;
    this.answers = quizConfiguration.answers;
    this.checkAnswers = function (answerIds) {
        var result = false;
        if (answerIds) {
            if (answerIds) {
                answerIds().sort();
                var correctIds = getCorrectAnswerIds().sort();
                if (answerIds.length === correctIds.length) {
                    for (var i = 0; i < correctIds.length; i++) {
                        if(answerIds[i] !== correctIds[i]) {
                            return false;
                        }
                    }
                    result = true;
                }
            }
            return result;
        }
        function getCorrectAnswerIds() {
            var result = [];
            that.answers.forEach(function (element, index) {
                if (element.correct) {
                    result.push(index);
                }
            });
            return result;
        }
    }
};

exports.generateQuiz = function (hero) {
    //hero - Must contain currentField property.
    if (isChestField(hero.currentField)) {
        return new Quiz(quizDefinitions[Math.floor(Math.random() * quizDefinitions.length)]);
    }
    return null;
};


function isChestField(field) {
    return field && field.type === FieldType.CHEST;
}