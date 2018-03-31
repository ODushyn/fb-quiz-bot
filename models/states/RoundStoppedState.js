module.exports = RoundStoppedState;

function RoundStoppedState() {
    this.name = 'ROUND_STOPPED';
    this.init = function (player) {
        player.sendTextMessage(GAME_STOPPED.ASK_TYPE_OPTION, 2000);
        player.setHandler(new RoundStoppedHandler(player));
        player.changeState(new WaitingForQuizAnswerState());
    };
    this.transition = function () {};
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState');
const RoundStoppedHandler = require('../../handlers/RoundStoppedHandler');
const GAME_STOPPED = require('../../constants/const.js').GAME_STOPPED;