module.exports = StartNewRoundState;

function StartNewRoundState() {
    this.name = 'START_NEW_ROUND';
    this.init = function (player) {
        player.setHandler(new MultiChoiceHandler(player));
        player.addTextMessage("- You've got 30 sec for each question.");
        player.addTextMessage("- Type '!' to finish game at any time.");
        player.flushMessages();
        setTimeout(() => {
          player.getHandler().startRound();
        }, 2000);
        player.changeState(new WaitingForQuizAnswerState());
    };
    this.transition = function () {};
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState');
let MultiChoiceHandler = require('../../handlers/MultiChoiceHandler.js');