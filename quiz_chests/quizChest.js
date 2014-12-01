var FieldType = require("../public/js/fieldTypes.js");
var quizDefinitions = require("./quizDefinitions.json");
function Quiz(quizConfiguration) {
    this.question = quizConfiguration.question;
    this.answers = quizConfiguration.answers;
    this.answer = function (answer) {
        return this.answers[answer].correct
    }
}

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