//const context = require('./common/context.js');
const StateContext = require('./StateContext.js');
const WaitingFirstMessageState = require('./models/states/IntroductionStates.js').WaitingFirstMessageState;
const IntroductionHandler = require('./handlers/IntroductionHandler.js');
const Player = require('./models/Player.js');

let context = {};

exports.proceed = function(playerId, message){
    if (!context[playerId]) {
        let stateContext = new StateContext(new WaitingFirstMessageState());
        context[playerId] = new Player(playerId, stateContext);
    }
    context[playerId].process(message);
};