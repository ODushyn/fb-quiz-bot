const context = require('../../common/context.js');
const fbAPI = require('../../common/fbAPI.js');
const quize = require('../../constants/quize.js');
const TipHandler = require('../../common/tips.js');

module.exports = WaitingForQuizAnswerState;

function WaitingForQuizAnswerState(player) {
    const tipsHandler = new TipHandler(player, quize[context[player.id].questionId].answers[0]);
    this.name = 'WAITING_FOR_QUIZ_ANSWER';
    this.transition = function (message) {
        console.log('Get answer: ' + message);
        if (isAnswerCorrect(player.id, message)) {
            tipsHandler.stop();
            fbAPI.sendTextMessage(player.id, "Верно!");
            player.changeState(new PreparingQuizQuestionState(player))
        }
    };
    this.reset = function () {
        tipsHandler.stop()
    };
    tipsHandler.start(player);
}

function isAnswerCorrect(playerId, playerAnswer) {
    let answers = quize[context[playerId].questionId].answers;
    return answers.indexOf(playerAnswer.toLowerCase()) > -1;
}

const PreparingQuizQuestionState = require('../states/PreparingQuizQuestionState.js');