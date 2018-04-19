exports.WaitingFirstMessageState = WaitingFirstMessageState;
exports.WaitingQuestionsNumberPerRoundState = WaitingQuestionsNumberPerRoundState;
exports.WaitingTypeState = WaitingTypeState;

function WaitingFirstMessageState() {
    this.name = 'WAITING_FIRST_MESSAGE';
    this.transition = function (player) {
        player.changeState(new WaitingQuestionsNumberPerRoundState())
    };
}

function WaitingQuestionsNumberPerRoundState() {
    this.name = 'WAITING_QUESTIONS_NUMBER';
    this.init = function (player) {
        player.setHandler(new IntroductionHandler(player));
        player.addTextMessage(INTRODUCTION_MESSAGES.GREETING)
              .addTextMessage(INTRODUCTION_MESSAGES.ASK_QUESTIONS_NUMBER_PER_ROUND);
        player.flushMessages();
    };
    this.transition = function (player) {
        let questionsNumber = player.getMessage();
        let valid = player.getHandler().processQuestionsNumber(questionsNumber);
        if (valid) {
            player.setQuestionsNumberPerRound(questionsNumber);
            player.changeState(new WaitingTypeState())
        } else {
            player.addTextMessage('Type 1 or 2').flushMessages();
        }
    };
}

function WaitingTypeState() {
    this.name = 'WAITING_TYPES';
    this.init = function (player) {
        player.addTextMessage(INTRODUCTION_MESSAGES.ASK_TYPES).flushMessages();
    };
    this.transition = function (player) {
        let type = player.getMessage();
        let valid = player.getHandler().processType(type);
        if (valid) {
            player.setType(type);
            player.changeState(new StartNewRoundState());
        } else {
            player.addTextMessage('Type 1, 2 or 3').flushMessages();
        }
    };
}

let IntroductionHandler = require('../../handlers/IntroductionHandler.js');
const INTRODUCTION_MESSAGES = require('../../constants/const.js').INTRODUCTION;
const StartNewRoundState = require('./StartNewRoundState');