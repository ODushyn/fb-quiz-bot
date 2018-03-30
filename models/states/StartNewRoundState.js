module.exports = StartNewRoundState;

function StartNewRoundState() {
    this.name = 'START_NEW_ROUND';
    this.init = function (player) {
        player.sendTextMessage("You've got 30 sec to give an answer. \n For a new question type '-'");
        player.getHandler().startRound();
        player.changeState(new WaitingForQuizAnswerState());
    };
    this.transition = function () {};
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState');