const LookingForStartOptionState = require('./states/LookingForStartOptionState.js');

module.exports = function (id) {
    let botState = new LookingForStartOptionState(this);

    this.id = id;
    this.processMessage = function (message) {
        console.log('Current state: ' + botState.name);
        if(!botState.transit){
            botState.transition(message);
        }
    };
    this.changeState = function (newState, message) {
        console.log('New state: ' + newState.name);
        botState = newState;
        if(botState.transit){
            botState.transition(message);
        }
    }
    this.getState = function(){
        return botState;
    }
};