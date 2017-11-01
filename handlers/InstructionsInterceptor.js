const MultipleChoiceHandler = require('./HandlerEn.js');
const TipsHandler = require('./HandlerRu.js');

exports.intercept = function(message, stateContext, handler) {
    // TODO: add two states
    console.log('Intercept: ' + message);
    if(message === '!'){
        handler.stopRound(stateContext);
        return true;
    }
    if(message === '-'){
        handler.restartRound(stateContext);
        return true;
    }
    if(message === '!en') {
        handler.changeLanguage('en');
        handler.changeHandler(stateContext, new MultipleChoiceHandler());
        return true;
    }
    if(message === '!ru'){
        handler.changeLanguage('ru');
        handler.changeHandler(stateContext, new TipsHandler());
        return true;
    }
    return false;
}