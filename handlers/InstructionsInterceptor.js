module.exports = function (player) {
    console.log('Intercept: ' + player.getMessage());
    if (player.wantStopRound()) {
        player.getHandler().stopRound();
        return true;
    }
    if (player.wantRestartRound()) {
        player.getHandler().restartRound();
        return true;
    }
    return false;
};