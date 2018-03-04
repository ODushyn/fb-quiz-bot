const MultipleChoiceHandler = require('./MultiChoiceHandler');

exports.intercept = function (player, handler) {
    // TODO: add two states
    console.log('Intercept: ' + message);
    if (player.wantStopRound()) {
        handler.stopRound();
        return true;
    }
    if (player.wantRestartRound()) {
        handler.restartRound();
        return true;
    }
    // TODO: add once 'russian version is ready'
    /*if(message === '!en') {
     handler.changeLanguage('en');
     handler.changeHandler(new MultipleChoiceHandler());
     return true;
     }*/
    // TODO: add once 'russian version is ready'
    /*if(message === '!ru'){
     handler.changeLanguage('ru');
     handler.changeHandler(stateContext, new TipsHandler());
     return true;
     }*/
    return false;
};