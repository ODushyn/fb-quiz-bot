module.exports = MultiChoiceHandler;

function MultiChoiceHandler(initPlayer) {
    let ROUND_TIME = 30000;
    let roundTimeout;
    let possibleAnswers;
    let player = initPlayer;

    this.startRound = function () {
        _sendQuestion();
        _runRoundTimeout();
    };

    this.stopRound = function () {
        clearTimeout(roundTimeout);
        player.sendTextMessage('Game is stopped.' + '\n' + 'Type anything to continue.');
        player.changeState(new LookingForStartOptionState());
    };

    this.restartRound = function () {
        clearTimeout(roundTimeout);
        return this.startRound();
    };

    function _runRoundTimeout() {
        roundTimeout = setTimeout(function () {
            player.sendTextMessage('Time is over.' + '\n' + 'Correct answer was: ' + '*' + player.answer + '*' + '\n' + 'Type anything to continue.');
            player.changeState(new LookingForStartOptionState());
        }, ROUND_TIME);
    }

    this.processAnswer = function (player) {
        let answer = player.getMessage();
        if (acceptedAnswers(possibleAnswers).includes(answer)) {
            clearTimeout(roundTimeout);
            player.gaveCorrectAnswer() ? _processCorrectAnswer(answer) : _processIncorrectAnswer(answer);
            player.changeState(new LookingForStartOptionState());
        }
    };

    this.setPlayer = function (newPlayer) {
        player = newPlayer;
    };

    function _sendQuestion() {
        let category = player.settings.category;
        let difficulty = player.settings.difficulty;
        let type = player.settings.type;
        // TODO: refactor in small functions
        let url = 'https://opentdb.com/api.php?amount=1';
        if (question.CATEGORIES[category].apiValue) {
            url += '&category=' + question.CATEGORIES[category].apiValue;
        }
        if (question.DIFFICULTIES[difficulty].apiValue) {
            url += '&difficulty=' + question.DIFFICULTIES[difficulty].apiValue;
        }
        if (question.TYPES[type].apiValue) {
            url += '&type=' + question.TYPES[type].apiValue;
        }
        https.get(url, (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            resp.on('end', () => {
                console.log(data);
                //TODO: check if no questions found (ask to change category) {"response_code":0, results: []}
                let result = JSON.parse(data).results[0];
                possibleAnswers = result.incorrect_answers;
                // randomly insert correct answer;
                let randIndex = Math.floor(Math.random() * (possibleAnswers.length + 1));
                possibleAnswers.splice(randIndex, 0, result.correct_answer);
                player.update(result.question, (randIndex + 1).toString());
                player.sendTextMessage(result.question + '\n' + 'Type the number:\n' + _formatPossibleAnswers(possibleAnswers));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    function _processIncorrectAnswer() {
        player.sendTextMessage("Unfortunately, correct answer was: " + '*' + player.answer + '*' + '\n' + 'Type anything to continue.');
    }

    function _processCorrectAnswer() {
        player.sendTextMessage('Correct!' + '\n' + 'Type anything to continue.');
    }

    function _formatPossibleAnswers(possibleAnswers) {
        let formattedAnswers = '';
        possibleAnswers.forEach((answer, index) => {
            formattedAnswers += (index + 1) + '. ' + answer + '\n';
        });
        return formattedAnswers;
    }

    function acceptedAnswers(possibleAnswers) {
        let acceptedAnswers = [];
        for (let i = 0; i < possibleAnswers.length; i++) {
            acceptedAnswers.push((i + 1).toString());
        }
        return acceptedAnswers;
    }
}

const utils = require('../common/utils.js');
const question = require('../constants/const.js').QUESTION;
const https = require('https');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');