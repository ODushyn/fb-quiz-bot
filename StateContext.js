const Player = require('./models/Player.js');
const HandlerRu = require('./handlers/HandlerRu.js');
const HandlerEn = require('./handlers/HandlerEn.js');

module.exports = StateContext;

function StateContext(initialState, playerId) {
    let state = initialState;

    this.processMessage = function (message) {
        console.log('Current state: ' + state.name);
        if(!state.intercept(this, message)){
            state.transition(this, message);
        }

    };

    this.changeState = function (newState) {
        console.log('New state: ' + newState.name);
        state = newState;
    };
}