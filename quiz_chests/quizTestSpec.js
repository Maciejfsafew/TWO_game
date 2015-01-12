//uruchamianie z linii komend bedac w katalogu wyzej - "jasmine-node quiz_chests"
var _ = require("underscore");
describe("Quiz Test Suite", function () {
    var expectedQuiz = {
        "question": "Test question?",
        "answers": [
            {
                "answerText": "Test answer 1",
                "correct": true
            },
            {
                "answerText": "Test answer 2",
                "correct": false
            },
            {
                "answerText": "Test answer 3.",
                "correct": false
            },
            {
                "answerText": "Test answer 4",
                "correct": true
            }
        ]
    };
    var FieldType = require("../public/js/fieldTypes.js");
    var generateQuiz;
    beforeEach(function () {
        generateQuiz = require("./quiz")("./testQuizDefinitions");
    });
    it("should return test quiz", function () {
        var heroStub = {field: {type: FieldType.CHEST}};
        var quiz = generateQuiz(heroStub);
        expect(quiz.question).toBe(expectedQuiz.question);
        expect(_.isEqual(quiz.answers, expectedQuiz.answers)).toEqual(true);
    });

    it("should verify the answer correctly", function () {
        var heroStub = {field: {type: FieldType.CHEST}};
        var quiz = generateQuiz(heroStub);
        expect(quiz.checkAnswers([3])).toEqual(false);
        expect(quiz.checkAnswers([0,3])).toEqual(true);
        expect(quiz.checkAnswers([3,1])).toEqual(false);
        expect(quiz.checkAnswers([1,2])).toEqual(false);
    });

    it("should return null", function () {
        var heroStub = {field: {type: FieldType.MONSTER}};
        var quiz = generateQuiz(heroStub);
        expect(quiz).toBe(null);
    });

    it("should return null", function () {
        var heroStub = {};
        var quiz = generateQuiz(heroStub);
        expect(quiz).toBe(null);
    });

});