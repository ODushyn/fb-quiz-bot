module.exports = WaitingForQuizAnswerState;

function WaitingForQuizAnswerState() {
    this.name = 'WAITING_FOR_QUIZ_ANSWER';
    this.transition = function (player) {
        player.getHandler().processAnswer(player);
    };
    this.init = function (player) {};
}