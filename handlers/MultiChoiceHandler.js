module.exports = MultiChoiceHandler;

function MultiChoiceHandler(initPlayer) {
    let ROUND_TIME = 30000;
    let QUESTIONS = 5;
    let questionNumber = 0;
    let correctAnswersNumber = 0;
    let possibleAnswers;
    let roundTimeout;
    let player = initPlayer;

    this.startRound = function () {
        _resetStatistics();
        _startNextRound();
    };

    this.stopRound = function () {
        clearTimeout(roundTimeout);
        player.sendTextMessage(
            'Game is stopped.' +
            _score() + '\n' +
            'Type anything to start new round.'
        );
        player.changeState(new LookingForStartOptionState());
    };

    function _runRoundTimeout() {
        roundTimeout = setTimeout(function () {
            player.sendTextMessage('Time is over.' + '\n' + 'Correct answer was: ' + '*' + player.answer + '*');
            _startNextRound();
        }, ROUND_TIME);
    }

    this.processAnswer = function (player) {
        let answer = player.getMessage();
        if (acceptedAnswers(possibleAnswers).includes(answer)) {
            clearTimeout(roundTimeout);
            player.gaveCorrectAnswer() ? _processCorrectAnswer(answer) : _processIncorrectAnswer(answer);
            _startNextRound();
        }
    };

    function _startNextRound() {
        setTimeout(function () {
            if (questionNumber + 1 <= QUESTIONS) {
                questionNumber++;
                _sendQuestion();
                _runRoundTimeout();
            } else {
                player.sendTextMessage(
                    'Round is finished.' + '\n' +
                    _score() + '\n' +
                    'Type anything to start new round.'
                );
                player.changeState(new LookingForStartOptionState());
            }
        }, 2000)
    };

    function _resetStatistics() {
        questionNumber = 0;
        correctAnswersNumber = 0;
    }

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
                //TODO: check if no questions found (ask to change category) {"response_code":0, results: []}
                let result = JSON.parse(data).results[0];
                possibleAnswers = result.incorrect_answers;
                // randomly insert correct answer;
                let randIndex = Math.floor(Math.random() * (possibleAnswers.length + 1));
                possibleAnswers.splice(randIndex, 0, result.correct_answer);
                player.update(result.question, (randIndex + 1).toString());
                player.sendTextMessage(result.question + '\n' + 'Type the number:\n' + _formatPossibleAnswers(possibleAnswers), 1000);
            });
        }).on("error", (err) => {
            logger.error("Error: " + err.message, player);
        });
    }

    function _processIncorrectAnswer() {
        player.sendTextMessage("Unfortunately, correct answer was: " + '*' + player.answer + '*');
    }

    function _processCorrectAnswer() {
        correctAnswersNumber++;
        player.sendTextMessage('Correct!');
    }

    function _formatPossibleAnswers(possibleAnswers) {
        let formattedAnswers = '';
        possibleAnswers.forEach((answer, index) => {
            formattedAnswers += (index + 1) + '. ' + answer + '\n';
        });
        return formattedAnswers;
    }

    function _score() {
        return 'Your score: ' + correctAnswersNumber + '/' + questionNumber;
    }

    function acceptedAnswers(possibleAnswers) {
        let acceptedAnswers = [];
        for (let i = 0; i < possibleAnswers.length; i++) {
            acceptedAnswers.push((i + 1).toString());
        }
        return acceptedAnswers;
    }
}

const question = require('../constants/const.js').QUESTION;
const https = require('https');
const logger = require('../common/logger');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const StartNewRoundState = require('../models/states/StartNewRoundState.js');