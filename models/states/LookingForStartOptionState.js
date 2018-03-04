module.exports = LookingForStartOptionState;

function LookingForStartOptionState() {
    this.name = 'LOOKING_FOR_START_OPTION';
    this.init = function(){};
    this.transition = function (player) {
        player.changeState(new StartNewRoundState());
    };
}

const StartNewRoundState = require('./StartNewRoundState');