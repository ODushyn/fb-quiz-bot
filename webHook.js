const StateContext = require('./StateContext.js');
const WaitingFirstMessageState = require('./models/states/IntroductionStates.js')
  .WaitingFirstMessageState;
const Player = require('./models/Player.js');
const logger = require('./common/logger');
const INTRODUCTION_MESSAGES = require('./constants/const.js').INTRODUCTION;

let context = {};

exports.proceed = function(playerId, message) {
  logger.info('playerId: %s, text: %s', playerId, message);
  if (!context[playerId]) {
    logger.info('Create player: %s', playerId);
    let stateContext = new StateContext(new WaitingFirstMessageState());
    context[playerId] = new Player(playerId, stateContext);
    context[playerId].addTextMessage(INTRODUCTION_MESSAGES.GREETING);
  }
  context[playerId].process(message);
};
