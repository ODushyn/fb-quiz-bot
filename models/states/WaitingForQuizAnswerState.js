const context = require('../../common/context.js');
const quize = require('../../constants/quize.js');
const fbAPI = require('../../common/fbAPI.js');

module.exports = WaitingForQuizAnswerState;

function WaitingForQuizAnswerState(player) {
    this.name = 'WAITING_FOR_QUIZ_ANSWER';
    this.transition = function (message) {
        console.log('Get answer: ' + message);
        if (isAnswerCorrect(player.id, message)) {
            fbAPI.sendTextMessage(player.id, "Верно!");
            player.changeState(new PreparingQuizQuestionState(player))
        }
    }
}

function isAnswerCorrect(playerId, playerAnswer) {
    let answers = quize[context[playerId].questionId].answers;
    return answers.indexOf(playerAnswer) > -1;
}

const PreparingQuizQuestionState = require('../states/PreparingQuizQuestionState.js');