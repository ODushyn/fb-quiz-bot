const fbAPI = require('../../common/fbAPI.js');
const quize = require('../../constants/quize.js');
const instructionsInterceptor = require('../../handlers/InstructionsInterceptor.js');

module.exports = WaitingForQuizAnswerState;

function WaitingForQuizAnswerState() {
    this.name = 'WAITING_FOR_QUIZ_ANSWER';
    this.transition = function (player) {
        player.getHandler().processAnswer(player);
        player.changeState(new LookingForStartOptionState());
    };
    /*this.intercept = function(stateContext, message) {
        return instructionsInterceptor.intercept(message, handler);
    };*/
    this.init = function (player) {};
}

const LookingForStartOptionState = require('./LookingForStartOptionState.js');