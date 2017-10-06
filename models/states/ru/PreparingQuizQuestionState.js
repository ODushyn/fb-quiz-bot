const fbAPI = require('../../common/fbAPI.js');
const quize = require('../../constants/quize.js');
const utils = require('../../common/utils.js');

module.exports = function PreparingQuizQuestionState(player) {
    this.name = 'PREPARING_QUIZ_QUESTION';
    this.transit = true;
    this.transition = function () {
        let questionId = getQuestionId();
        player.questionId = questionId;
        fbAPI.sendTextMessage(player.id, generateQuestion(questionId));
        player.changeState(new WaitingForQuizAnswerState(player));
    };
    this.reset = function () {
    }
};

function getQuestionId() {
    return Math.floor((Math.random() * 4) + 1);
}

function generateQuestion(questionId) {
    return quize[questionId].question + '\n' + generateMaskedAnswer(questionId);
}

function generateMaskedAnswer(questionId) {
    const answers = quize[questionId].answers;
    return 'Ответ: ' + utils.maskAnswer(answers[0]);
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState.js');