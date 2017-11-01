const fbAPI = require('../common/fbAPI.js');

module.exports = Player;

function Player(id) {
    this.id = id;
    this.language = '';
    this.settings = {
        MULTIPLE_CHOICE: {
            introduced: false
        },
        TIPS: {
            introduced: true
        }
    };
    this.question = '';
    this.answer = '';

    this.update = function(ques, ans) {
        this.question = ques;
        this.answer = ans;
    };

    this.isCorrect = function(userAnswer){
        return this.answer.toLowerCase() === userAnswer.toLowerCase();
    };

    this.introductionDone = function(name){
        return this.settings[name].introduced;
    };

    this.sendTextMessage = function(text) {
        fbAPI.sendTextMessage(this.id, text);
    }
};