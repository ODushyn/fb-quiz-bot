const fbAPI = require('../../common/fbAPI.js');
const quize = require('../../constants/quize.js');

module.exports = function PreparingQuizQuestionState(player) {
    this.name = 'PREPARING_QUIZ_QUESTION';
    this.transit = true;
    this.transition = function () {
        let questionId = getQuestionId();
        player.questionId = questionId;
        fbAPI.sendTextMessage(player.id, quize[questionId].question);
        player.changeState(new WaitingForQuizAnswerState(player));
    };

};

function getQuestionId() {
    return Math.floor((Math.random() * 4) + 1);
}

const WaitingForQuizAnswerState = require('./WaitingForQuizAnswerState.js');