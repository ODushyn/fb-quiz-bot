module.exports = RoundStoppedState;

function RoundStoppedState() {
    this.name = 'ROUND_STOPPED';
    this.init = function (player) {
        player.addTextMessage(GAME_STOPPED.ASK_TYPE_OPTION).flushMessages();
        player.setHandler(new RoundStoppedHandler(player));
        player.changeState(new WaitingForQuizAnswerState());
    };
    this.transition = function () {};
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState');
const RoundStoppedHandler = require('../../handlers/RoundStoppedHandler');
const GAME_STOPPED = require('../../constants/const.js').GAME_STOPPED;