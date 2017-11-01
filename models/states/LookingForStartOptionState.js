module.exports = LookingForStartOptionState;

function LookingForStartOptionState(handler) {
    this.name = 'WAITING_FOR_START_OPTION';
    this.transition = function (stateContext, message) {
        handler.startRound(stateContext);
    };
    this.intercept = function(stateContext, message) {
        return instructionsInterceptor.intercept(message, stateContext, handler);
    }
}

const instructionsInterceptor = require('../../handlers/InstructionsInterceptor.js');