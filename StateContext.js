const intercept = require('./handlers/InstructionsInterceptor');

module.exports = StateContext;

function StateContext(initialState) {
    let state = initialState;

    this.process = function (player) {
        console.log('StateContext: current state: ' + state.name);
        console.log('StateContext: process message: ' + player.getMessage());
        //TODO: consider returning new state here instead of boolean
        // create factory for state.getHandler
        //TODO: !! implement interception
        //let isIntercepted = intercept(player, state.getHandler());
        //if (!isIntercepted) {
            state.transition(player);
        //}
    };

    this.changeState = function (newState, player) {
        console.log('New state: ' + newState.name);
        state = newState;
        // todo: init state if needed
        state.init(player);
    };
}