const intercept = require('./handlers/InstructionsInterceptor');
const logger = require('./common/logger');
module.exports = StateContext;

function StateContext(initialState) {
    let state = initialState;

    this.process = function (player) {
        logger.info('StateContext: current state: ' + state.name, player.getId());
        logger.info('StateContext: process message: ' + player.getMessage(), player.getId());
        if (!intercept(player)) {
            state.transition(player);
        }
    };

    this.changeState = function (newState, player) {
        logger.info('StateContext: current state: ' + state.name, player.getId());
        state = newState;
        state.init(player);
    };
}