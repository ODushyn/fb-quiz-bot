module.exports = IntroductionHandler;

function IntroductionHandler(initPlayer) {
    let player = initPlayer;

    this.processQuestionsNumber = function(questionsNumber) {
        return Object.getOwnPropertyNames(QUESTION.NUMBER_PER_ROUND).includes(questionsNumber);
    },
    this.processDifficulty = function(difficultyNum) {
        return Object.getOwnPropertyNames(QUESTION.DIFFICULTIES).includes(difficultyNum);
    },
    this.processType = function(typeNum) {
        return Object.getOwnPropertyNames(QUESTION.TYPES).includes(typeNum);
    },
    this.stopRound = function () {
        player.addTextMessage('Game has not started yet.').flushMessages();
    },
    this.restartRound = function () {
        player.addTextMessage('Game has not started yet.').flushMessages();
    }
};

const QUESTION = require('../constants/const.js').QUESTION;