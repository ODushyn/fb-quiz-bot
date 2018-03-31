module.exports = RoundStoppedHandler;

function RoundStoppedHandler(initPlayer) {
    let player = initPlayer;

    this.processAnswer = function(player) {
        if(player.getMessage() === GAME_STOPPED.START_NEW_ROUND_OPT){
            player.changeState(new SetupHandlerState());

        }
        if(player.getMessage() === GAME_STOPPED.CHANGE_SETTING_OPT){
            player.changeState(new WaitingQuestionsNumberPerRoundState());
        }
    }
};

const GAME_STOPPED = require('../constants/const.js').GAME_STOPPED;
const SetupHandlerState = require('../models/states/IntroductionStates').SetupHandlerState;
const WaitingQuestionsNumberPerRoundState = require('../models/states/IntroductionStates').WaitingQuestionsNumberPerRoundState;