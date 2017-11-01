const utils = require('../common/utils.js');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const INTERVAL_TIME = 2000;
const TIPS_NUMBER = 2;

module.exports = function TipsHelper(stateContext, player, finishState) {
    let round = 1;
    let tip;
    let tipsInterval;

    this.start = function () {
        tip = utils.maskAnswer(player.answer);
        tipsInterval = setIntervalXTimes(() => {
            tip = generateTip(player.answer, tip, round++);
            player.sendTextMessage(tip);
        }, INTERVAL_TIME, TIPS_NUMBER);
    };
    this.stop = function () {
        clearInterval(tipsInterval);
    };

    function setIntervalXTimes(func, delay, repetitions){
        let count = 0;
        let interval = setInterval(() => {
            if(++count <= repetitions){
                func();
            } else {
                clearInterval(interval);
                player.sendTextMessage("Правильный ответ: " + '*'+player.answer+'*' + '\n' + 'Напишите что-нибудь, чтобы продолжить.');
                stateContext.changeState(finishState);
            }
        }, INTERVAL_TIME);

        return interval;
    }
};

function generateTip(answer, oldTip, round) {
    let newTip = oldTip;
    let tipCharsNum = _tipCharsNumber(utils.removeAnswerSpecialSymbols(oldTip).length, round);
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