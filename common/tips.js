const fbAPI = require('./fbAPI.js');
const utils = require('../common/utils.js');
const SendingQuizAnswerState = require('../models/states/ru/SendingQuizAnswerState.js');
const INTERVAL_TIME = 12000;
const TIPS_NUMBER = 2;

module.exports = function TipHandler(player, answer) {
    let round = 1;
    let tip = utils.maskAnswer(answer);
    let tipsInterval;
    this.start = function () {
        tipsInterval = setIntervalXTimes(() => {
            tip = generateTip(answer, tip, round++);
            fbAPI.sendTextMessage(player.id, tip);
        }, INTERVAL_TIME, TIPS_NUMBER, player);
    };
    this.stop = function () {
        clearInterval(tipsInterval);
    };
};

function setIntervalXTimes(func, delay, repetitions, player){
    let count = 0;
    let interval = setInterval(() => {
        if(++count <= repetitions){
            func();
        } else {
            clearInterval(interval);
            player.changeState(new SendingQuizAnswerState(player));
        }
    }, INTERVAL_TIME);

    return interval;
}

function generateTip(answer, oldTip, round) {
    let newTip = oldTip;
    let tipCharsNum = _tipCharsNumber(utils.removeSpecialSymbols(oldTip).length, round);
    _tipCharIndexes(tipCharsNum, newTip).forEach((value) => {
        newTip = _replaceAt(newTip, value, answer[value]);
    });
    return newTip;
}

function _tipCharIndexes(tipCharsNum, tip) {
    let arr = [];
    while (arr.length < tipCharsNum) {
        var randNum = Math.floor((Math.random() * tip.length));
        if (arr.indexOf(randNum) > -1 || tip.charAt(randNum) !== '#' || tip.charAt(randNum) === ' ') continue;
        arr[arr.length] = randNum;
    }
    return arr;
}

function _tipCharsNumber(answerLength, round) {
    // TODO: improve function. It shows the answer on the second round if answer is one character long
    if (answerLength < 10) {
        if (round === 1) return Math.ceil(answerLength / 2) - 1;
        if (round === 2) return Math.floor(answerLength / 2) - Math.ceil(answerLength / 2) + 2;
    } else {
        if (round === 1) return Math.floor(answerLength / 2);
        if (round === 2) return Math.ceil(answerLength / 2) - Math.floor(answerLength / 2) + 2;
    }
    return 0;
}

function _replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}