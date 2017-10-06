// Process global commands:
// - Type anything to start the game
// - Type '-' to skip current question and get new one
// - Type '!' to stop the game

exports.processGlobalCommands = function(player, message) {
    if(message === '!'){
        player.reset();
        player.changeState(new LookingForStartOptionStateRu(player));
        return true;
    }
    if(message === '-'){
        player.reset();
        player.changeState(new PreparingQuizQuestionStateRu(player));
        return true;
    }

    return false;
}

const LookingForStartOptionStateRu = require('../models/states/LookingForStartOptionState.js');
const PreparingQuizQuestionStateRu = require('../models/states/ru/PreparingQuizQuestionState.js');