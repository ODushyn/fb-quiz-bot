module.exports = function (player) {
    if (player.wantStopRound() && player.getHandler().stopRound) {
        player.getHandler().stopRound();
        return true;
    }
    return false;
};