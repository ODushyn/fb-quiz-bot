module.exports = function (player) {
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