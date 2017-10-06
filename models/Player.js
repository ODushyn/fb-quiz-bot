module.exports = function (id) {
    let botState = new LookingForStartOptionState(this);

    this.id = id;
    this.processMessage = function (message) {
        console.log('Current state: ' + botState.name);
        let isGlobalMsg = instructions.processGlobalCommands(this, message);
        if(isGlobalMsg){
            return;
        }
        // if system in transition state we should not precess messages
        if (!botState.transit) {
            botState.transition(message);
        }
    };
    this.changeState = function (newState, message) {
        console.log('New state: ' + newState.name);
        botState = newState;
        // if system's current state is transit
        // then it's just a processing task so call it transition implicitly and immediatly
        if (botState.transit) {
            botState.transition(message);
        }
    };
    this.reset = function () {
        botState.reset();
    }
};

const LookingForStartOptionState = require('./states/LookingForStartOptionState.js');
const instructions = require('../common/instructions.js');