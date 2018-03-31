exports.WaitingFirstMessageState = WaitingFirstMessageState;
exports.WaitingDifficultyState = WaitingDifficultyState;
exports.WaitingQuestionsNumberPerRoundState = WaitingQuestionsNumberPerRoundState;
exports.WaitingTypeState = WaitingTypeState;

function WaitingFirstMessageState() {
    this.name = 'WAITING_FIRST_MESSAGE';
    this.transition = function (player) {
        player.sendTextMessage('We are playing round. Round contains 5 questions.');
        player.changeState(new WaitingQuestionsNumberPerRoundState())
    };
}

function WaitingQuestionsNumberPerRoundState() {
    this.name = 'WAITING_QUESTIONS_NUMBER';
    this.init = function (player) {
        player.sendTextMessage(INTRODUCTION_MESSAGES.ASK_QUESTIONS_NUMBER_PER_ROUND);
    };
    this.transition = function (player) {
        let questionsNumber = player.getMessage();
        let valid = player.getHandler().processQuestionsNumber(questionsNumber);
        if (valid) {
            player.setQuestionsNumberPerRound(questionsNumber);
            player.changeState(new WaitingDifficultyState())
        }
    };
}

function WaitingDifficultyState() {
    this.name = 'WAITING_DIFFICULTY';
    this.init = function(player) {
        player.sendTextMessage(INTRODUCTION_MESSAGES.ASK_DIFFICULTY);
    };
    this.transition = function (player) {
        let difficulty = player.getMessage();
        let valid = player.getHandler().processDifficulty(difficulty);
        if (valid) {
            player.setDifficulty(difficulty);
            player.changeState(new WaitingTypeState());
        }
    };
}

function WaitingTypeState() {
    this.name = 'WAITING_TYPES';
    this.init = function (player) {
        player.sendTextMessage(INTRODUCTION_MESSAGES.ASK_TYPES);
    };
    this.transition = function (player) {
        let type = player.getMessage();
        let valid = player.getHandler().processType(type);
        if (valid) {
            player.setType(type);
            player.changeState(new SetupHandlerState());
        }
    };
}

function SetupHandlerState() {
    this.name = 'SETUP_HANDLER';
    this.init = function (player) {
        player.setHandler(new MultiChoiceHandler(player));
        player.sendTextMessage("You've got 30 sec for each question.\nType '!' to stop the game.");
        player.changeState(new StartNewRoundState());
    };
    this.transition = function () {};
}

let MultiChoiceHandler = require('../../handlers/MultiChoiceHandler.js');
const INTRODUCTION_MESSAGES = require('../../constants/const.js').INTRODUCTION;
const StartNewRoundState = require('./StartNewRoundState');