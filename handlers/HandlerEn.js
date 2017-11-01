module.exports = HandlerEn;

function HandlerEn(initPlayer) {
    let ROUND_TIME = 30000;
    let roundTimeout;
    let possibleAnswers;
    let player = initPlayer;

    this.handlerName = 'MULTIPLE_CHOICE';

    this.startRound = function(stateContext, message){
        _sendQuestion(player.settings.category, player.settings.difficulty, player.settings.type);
        _runRoundTimeout(stateContext, this);
        stateContext.changeState(new WaitingForQuizAnswerState(this));
    }

    this.stopRound = function(stateContext){
        clearTimeout(roundTimeout);
        stateContext.changeState(new LookingForStartOptionState(this));
        player.sendTextMessage(translations.get('GAME_STOPPED'));
    }

    this.restartRound = function(stateContext) {
        clearTimeout(roundTimeout);
        this.startRound(stateContext);
    }

    this.changeHandler = function(stateContext, newHandler){
        clearTimeout(roundTimeout);
        newHandler.setPlayer(player);
        stateContext.changeState(new LookingForStartOptionState(newHandler));
        player.sendTextMessage(translations.get('LANG_CHANGED'));
    }

    this.processAnswer = function(stateContext, answer) {
        if(acceptedAnswers(possibleAnswers).includes(answer)){
            player.isCorrect(answer) ? _processCorrectAnswer(stateContext, this) : _processIncorrectAnswer(stateContext, this);
        }
    }

    this.setPlayer = function(newPlayer){
        player = newPlayer;
    }

    this.changeLanguage = function(language){
        translations.setCurrentLanguage(language);
        player.language = language;
    }


    function _sendQuestion(category, difficulty, type) {
        // TODO: move player.update to Parent and call from MainHandler
        // TODO: refactor in small functions
        let url = 'https://opentdb.com/api.php?amount=1';
        console.log(question.CATEGORIES[category]);
        if(question.CATEGORIES[category].apiValue){
            url += '&category=' + question.CATEGORIES[category].apiValue;
        }
        if(question.DIFFICULTIES[difficulty].apiValue){
            url += '&difficulty=' + question.DIFFICULTIES[difficulty].apiValue;
        }
        if(question.TYPES[type].apiValue){
            url += '&type=' + question.TYPES[type].apiValue;
        }
        console.log(url);
        https.get(url, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            resp.on('end', () => {
                let result = JSON.parse(data).results[0];
                possibleAnswers = result.incorrect_answers;
                // randomly insert correct answer;
                let randIndex = Math.floor(Math.random() * (possibleAnswers.length + 1));
                possibleAnswers.splice(randIndex, 0, result.correct_answer);
                player.update(result.question, (randIndex + 1).toString());
                player.sendTextMessage(result.question + '\n' + 'Type the number:\n' + _formatPossibleAnswers(possibleAnswers));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    function _processIncorrectAnswer(stateContext, handler) {
        clearTimeout(roundTimeout);
        player.sendTextMessage("Unfortunately, correct answer was: " + '*'+player.answer+'*' + '\n' + 'Type anything to continue.');
        stateContext.changeState(new LookingForStartOptionState(handler));
    }

    function _processCorrectAnswer(stateContext, handler){
        clearTimeout(roundTimeout);
        player.sendTextMessage(translations.get('CORRECT_ANSWER'));
        stateContext.changeState(new LookingForStartOptionState(handler));
    }

    function _runRoundTimeout(stateContext, handler){
        roundTimeout = setTimeout(function(){
            player.sendTextMessage('Time is over.' + '\n' + 'Correct answer was: ' + '*'+player.answer+'*' + '\n' + 'Type anything to continue.');
            stateContext.changeState(new LookingForStartOptionState(handler));
        }, ROUND_TIME);
    }

    function _formatPossibleAnswers(possibleAnswers){
        let formattedAnswers = '';
        possibleAnswers.forEach((answer, index) => {
            formattedAnswers += (index + 1) + '. ' + answer + '\n';
        });
        return formattedAnswers;
    }

    function acceptedAnswers(possibleAnswers){
        let acceptedAnswers = [];
        for(let i=0; i <possibleAnswers.length; i++){
            acceptedAnswers.push((i+1).toString());
        }
        return acceptedAnswers;
    }
};

const utils = require('../common/utils.js');
const question = require('../constants/const.js').QUESTION;
const translations = require('../common/translations');
const https = require('https');
const WaitingForQuizAnswerState = require('../models/states/WaitingForQuizAnswerState.js');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');