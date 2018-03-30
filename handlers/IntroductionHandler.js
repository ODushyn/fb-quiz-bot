module.exports = IntroductionHandler;

function IntroductionHandler(initPlayer) {
    let player = initPlayer;

    this.processCategory = function(categoryNum) {
        return Object.getOwnPropertyNames(QUESTION.CATEGORIES).includes(categoryNum);
    },
    this.processDifficulty = function(difficultyNum) {
        return Object.getOwnPropertyNames(QUESTION.DIFFICULTIES).includes(difficultyNum);
    },
    this.processType = function(typeNum) {
        return Object.getOwnPropertyNames(QUESTION.TYPES).includes(typeNum);
    },
    this.stopRound = function () {
        player.sendTextMessage('Game has not started yet.');
    },
    this.restartRound = function () {
        player.sendTextMessage('Game has not started yet.');
    }
};

const QUESTION = require('../constants/const.js').QUESTION;