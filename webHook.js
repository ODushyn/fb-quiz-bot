const context = require('./common/context.js');
const StateContext = require('./StateContext.js');
const WaitingFirstMessageState = require('./models/states/IntroductionStates.js').WaitingFirstMessageState;
const IntroductionHandler = require('./handlers/IntroductionHandler.js');
const Player = require('./models/Player.js');

exports.proceed = function(playerId, message){
    if (!context[playerId]) {
        let handler = new IntroductionHandler(new Player(playerId));
        let state = new WaitingFirstMessageState(handler);
        context[playerId] = new StateContext(state);
    }
    console.log('Process message: ' + message);
    context[playerId].processMessage(message);
};