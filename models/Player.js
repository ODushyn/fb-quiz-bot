module.exports = Player;

function Player(id, stateContext) {
    this.id = id;
    this.message = null;
    this.settings = {
        category: "1", // always random category
        MULTIPLE_CHOICE: {
            introduced: false
        }
    };
    this.quiz = [];
    this.handler = new IntroductionHandler(this);
    this.stateContext = stateContext;

    this.getId = function () {
        return this.id;
    };

    this.process = function (message) {
        this.message = message;
        this.stateContext.process(this);
    };

    this.changeState = function (newState) {
        this.stateContext.changeState(newState, this)
    };

    this.setHandler = function (handler) {
        this.handler = handler;
    };

    this.getHandler = function () {
        return this.handler;
    };

    // PLAYER RELATED
    this.setQuiz = function (quiz) {
        this.quiz = quiz;
    };

    this.gaveCorrectAnswer = function (num = 1) {
        return this.quiz[num - 1].correctOption.toLowerCase() === this.message.toLowerCase();
    };

    this.gaveValidAnswer = function (num = 1) {
        return this.quiz[num - 1].possibleOptions.includes(this.message);
    };

    this.sendTextMessage = function (text) {
        fbAPI.sendTextMessage(this.id, he.decode(text));
    };

    this.getMessage = function () {
        return this.message;
    };

    this.getQuestion = function (num = 1) {
        return this.quiz[num - 1].question;
    };

    this.getCorrectOption = function (num = 1) {
        return this.quiz[num - 1].correctOption;
    };

    this.getPossibleAnswers = function (num = 1) {
        return this.quiz[num - 1].possibleAnswers;
    };

    this.getDifficulty = function () {
        let difficulty = this.settings.difficulty;
        return question.DIFFICULTIES[difficulty];
    };

    this.getCategory = function () {
        let category = this.settings.category;
        return question.CATEGORIES[category];
    }

    this.getQuestionCategory = function (num = 1) {
        return this.quiz[num - 1].category;
    }

    this.getType = function () {
        let type = this.settings.type
        return question.TYPES[type];
    }

    this.getQuestionsNumberPerRound = function () {
        let questionsNumberPerRound = this.settings.questionsNumberPerRound;
        return question.NUMBER_PER_ROUND[questionsNumberPerRound];
    }

    this.setQuestionsNumberPerRound = function (questionsNumber) {
        this.settings.questionsNumberPerRound = questionsNumber;
    };

    this.setDifficulty = function (difficulty) {
        this.settings.difficulty = difficulty;
    };

    this.setType = function (type) {
        this.settings.type = type;
    };

    // intercept commands
    this.wantStopRound = function () {
        return this.message === '!'
    };

    this.wantRestartRound = function () {
        return this.message === '-'
    };
}

const fbAPI = require('../common/fbAPI.js');
const he = require('he');
const IntroductionHandler = require('../handlers/IntroductionHandler');
const question = require('../constants/const.js').QUESTION;