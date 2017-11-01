module.exports = HandlerRu;

function HandlerRu(initPlayer){
    let tips;
    let player = initPlayer;

    this.handlerName = 'TIPS';

    this.startRound = function(stateContext, message){
        _sendQuestion();
        _runTipsHandling(stateContext, new LookingForStartOptionState(this));
        stateContext.changeState(new WaitingForQuizAnswerState(this));
    }

    this.stopRound = function(stateContext){
        if(tips) {
            tips.stop();
        }
        stateContext.changeState(new LookingForStartOptionState(this));
        player.sendTextMessage(translations.get('GAME_STOPPED'));
    }

    this.restartRound = function(stateContext){
        if(tips) {
            tips.stop();
        }
        this.startRound();
    }

    this.changeHandler = function(stateContext, newHandler){
        if(tips) {
            tips.stop();
        }
        newHandler.setPlayer(player);
        if(player.introductionDone(newHandler.handlerName)){
            stateContext.changeState(new LookingForStartOptionState(newHandler));
        } else {
            stateContext.changeState(new WaitingCategoryState(new IntroductionHandler(player)));
        }
        player.sendTextMessage(translations.get('LANG_CHANGED'));
    }

    this.changeLanguage = function(language){
        translations.setCurrentLanguage(language);
        player.language = language;
    }

    this.processAnswer = function(stateContext, answer){
        if(player.isCorrect(answer)) {
            _processCorrectAnswer(stateContext, answer);
        }
    }

    this.setPlayer = function(newPlayer){
        player = newPlayer;
    }

    function _sendQuestion() {
        // TODO: move player.update to Parent and call from MainHandler
        let randQuize = _getRandomQuize();
        let question = randQuize.question;
        let answer = randQuize.answer;
        player.update(question, answer);
        player.sendTextMessage(question + '\n' + 'Ответ: ' + utils.maskAnswer(answer));
    }

    function _processCorrectAnswer(stateContext, answer) {
        tips.stop();
        player.sendTextMessage(translations.get('CORRECT_ANSWER'));
    }

    function _runTipsHandling(stateContext, handler) {
        tips = new Tips(stateContext, player, handler);
        tips.start();
    }

    function _getRandomQuize() {
        let randQuize = Math.floor(Math.random() * Object.keys(quize).length);
        return quize[randQuize];
    }
};

const utils = require('../common/utils.js');
const quize = require('../constants/quize.js');
const translations = require('../common/translations');
const Tips = require('./TipsHelper.js');
const IntroductionHandler = require('./IntroductionHandler.js');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const WaitingForQuizAnswerState = require('../models/states/WaitingForQuizAnswerState.js');
const WaitingCategoryState = require('../models/states/IntroductionStates.js').WaitingCategoryState;