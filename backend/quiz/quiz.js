var FieldType, quizDefinitions;

function initiate(definitionsFilePath) {
    if (definitionsFilePath) {
        quizDefinitions = require(definitionsFilePath);
    } else {
        quizDefinitions = require("./quizDefinitions.json");
    }
    FieldType = require("../fieldTypes.js");
}


function Quiz(quizConfiguration) {
    var that = this;
    this.question = quizConfiguration.question;
    this.answers = quizConfiguration.answers;
    this.checkAnswers = function (answerIds) {
        var result = false;
        if (answerIds) {
            answerIds.sort();
            var correctIds = getCorrectAnswerIds().sort();
            if (answerIds.length === correctIds.length) {
                for (var i = 0; i < correctIds.length; i++) {
                    if (answerIds[i] !== correctIds[i]) {
                        return false;
                    }
                }
                result = true;
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
    };

}
Quiz.prototype.toString = function () {
    var str = this.question;
    this.answers.forEach(function (element, index) {
        str += ("<br/>" + index + ". " + element.answerText)
    });
    return str;
};
function generateQuiz(field) {
    //hero - Must contain currentField property.
    if (isChestFieldAndNotLooted(field)) {
        return new Quiz(quizDefinitions[Math.floor(Math.random() * quizDefinitions.length)]);
    }
    return null;
}

function isChestFieldAndNotLooted(field) {
    console.log(field);
    return field && field.type === FieldType.CHEST && !field.looted;
}

function hideChest(field) {
    if (isChestFieldAndNotLooted(field)) {
        field.type = FieldType.PATH;
    }
}

module.exports = function (definitionsFilePath) {
    initiate(definitionsFilePath);
    return {
        'generateQuiz': generateQuiz,
        'isChestFieldAndNotLooted': isChestFieldAndNotLooted,
        'hideChest': hideChest
    };
};