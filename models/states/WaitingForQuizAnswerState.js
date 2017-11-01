const fbAPI = require('../../common/fbAPI.js');
const quize = require('../../constants/quize.js');
const instructionsInterceptor = require('../../handlers/InstructionsInterceptor.js');

module.exports = WaitingForQuizAnswerState;

function WaitingForQuizAnswerState(handler) {
    this.name = 'WAITING_FOR_QUIZ_ANSWER';
    this.transition = function (stateContext, message) {
        console.log('Get answer: ' + message);
        handler.processAnswer(stateContext, message);
    };
    this.intercept = function(stateContext, message) {
        return instructionsInterceptor.intercept(message, stateContext, handler);
    }
}