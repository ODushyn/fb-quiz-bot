const intercept = require('./handlers/InstructionsInterceptor');

module.exports = StateContext;

function StateContext(initialState) {
    let state = initialState;

    this.process = function (player) {
        console.log('StateContext: current state: ' + state.name);
        console.log('StateContext: process message: ' + player.getMessage());
        if (!intercept(player)) {
            state.transition(player);
        }
    };

    this.changeState = function (newState, player) {
        console.log('New state: ' + newState.name);
        state = newState;
        state.init(player);
    };
}