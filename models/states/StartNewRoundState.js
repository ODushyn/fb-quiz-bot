module.exports = StartNewRoundState;

function StartNewRoundState() {
    this.name = 'START_NEW_ROUND';
    this.init = function (player) {
        player.getHandler().startRound();
        player.changeState(new WaitingForQuizAnswerState());
    };
    this.transition = function () {};
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState');