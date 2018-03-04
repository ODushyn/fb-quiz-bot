module.exports = Player;

function Player(id, stateContext) {
    // USER properties
    this.id = id;
    this.message = null;
    this.language = '';
    this.settings = {
        MULTIPLE_CHOICE: {
            introduced: false
        },
        TIPS: {
            introduced: true
        }
    };
    this.question = '';
    this.answer = '';
    this.validAnswers = [];

    // STATE related
    this.handler = null;
    this.stateContext = stateContext;
    this.getStateContext = function () {
        return this.stateContext;
    };

    this.process = function (message) {
        this.message = message;
        this.stateContext.process(this);
    };

    this.changeState = function (newState) {
        this.stateContext.changeState(newState, this)
    };

    this.setupHandler = function() {
      this.handler = new MultiChoiceHandler(this);
    };

    this.getHandler = function () {
        return this.handler;
    };

    // PLAYER RELATED

    this.update = function (ques, ans) {
        this.question = ques;
        this.answer = ans;
    };

    this.gaveCorrectAnswer = function () {
        return this.answer.toLowerCase() === this.message.toLowerCase();
    };

    this.gaveValidAnswer = function () {
        return this.validAnswers.contains(this.message);
    };

    this.introductionDone = function (name) {
        return this.settings[name].introduced;
    };

    this.sendTextMessage = function (text) {
        fbAPI.sendTextMessage(this.id, text);
    };

    this.getMessage = function () {
        return this.message;
    };

    this.setCategory = function (category) {
        this.settings.category = category;
    };

    this.setDifficulty = function (difficulty) {
        this.settings.difficulty = difficulty;
    };

    this.setType = function (type) {
        this.settings.type = type;
    };

    this.reset = function () {
        // TODO reset here
    };

    // intercept commands
    this.wantStopRound = function () {
        return this.message === '!'
    };

    this.wantRestartRound = function () {
        this.message === '-'
    };
}

const fbAPI = require('../common/fbAPI.js');
const context = require('../common/context');
let MultiChoiceHandler = require('../handlers/MultiChoiceHandler.js');