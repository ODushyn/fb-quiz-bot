module.exports = LookingForStartOptionState;

function LookingForStartOptionState(player) {
    this.name = 'WAITING_FOR_START_OPTION';
    this.transition = function (message) {
        if (message === 'старт') {
            player.changeState(new PreparingQuizQuestionState(player));
        }
    }
}

const PreparingQuizQuestionState = require('../states/PreparingQuizQuestionState.js');