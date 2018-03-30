module.exports = {
    processCategory: function(categoryNum) {
        return Object.getOwnPropertyNames(QUESTION.CATEGORIES).includes(categoryNum);
    },
    processDifficulty: function(difficultyNum) {
        return Object.getOwnPropertyNames(QUESTION.DIFFICULTIES).includes(difficultyNum);
    },
    processType: function(typeNum) {
        return Object.getOwnPropertyNames(QUESTION.TYPES).includes(typeNum);
    },
    stopRound: function () {
        player.sendTextMessage('Game has not started yet.');
    },
    restartRound: function () {
        player.sendTextMessage('Game has not started yet.');
    }
};

const QUESTION = require('../constants/const.js').QUESTION;