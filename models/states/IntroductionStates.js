exports.WaitingFirstMessageState = WaitingFirstMessageState;
exports.WaitingCategoryState = WaitingCategoryState;
exports.WaitingDifficultyState = WaitingDifficultyState;
exports.WaitingTypeState = WaitingTypeState;

function WaitingFirstMessageState() {
    this.name = 'WAITING_FIRST_MESSAGE';
    this.transition = function (player) {
        player.changeState(new WaitingCategoryState())
    };
}

function WaitingCategoryState() {
    this.name = 'WAITING_CATEGORY';
    this.init = function (player) {
        player.sendTextMessage(INTRODUCTION_MESSAGES.ASK_CATEGORY);
    };
    this.transition = function (player) {
        let category = player.getMessage();
        let valid = introductionHandler.processCategory(category);
        if (valid) {
            player.setCategory(category);
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
        let valid = introductionHandler.processDifficulty(difficulty);
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
        let valid = introductionHandler.processType(type);
        if (valid) {
            player.setType(type);
            player.changeState(new SetupHandlerState());
        }
    };
}

function SetupHandlerState() {
    this.name = 'SETUP_HANDLER';
    this.init = function (player) {
        player.setupHandler();
        player.changeState(new StartNewRoundState());
    };
}

let introductionHandler = require('../../handlers/IntroductionHandler');
const INTRODUCTION_MESSAGES = require('../../constants/const.js').INTRODUCTION;
const StartNewRoundState = require('./StartNewRoundState');