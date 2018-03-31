module.exports = MultiChoiceHandler;

function MultiChoiceHandler(initPlayer) {
    let ROUND_TIME = 30000;
    let QUESTIONS = initPlayer.settings.questionsNumberPerRound;
    let questionNumber = 0;
    let correctAnswersNumber = 0;
    let roundTimeout;
    let player = initPlayer;

    this.startRound = function () {
        _resetStatistics();
        _setUpRoundQuiz();
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

    this.processAnswer = function (player) {
        if (player.gaveValidAnswer()) {
            clearTimeout(roundTimeout);
            player.gaveCorrectAnswer() ? _processCorrectAnswer() : _processIncorrectAnswer();
            _startNextRound();
        }
    };

    function _runRoundTimeout() {
        roundTimeout = setTimeout(function () {
            player.sendTextMessage('Time is over.' + '\n' + 'Correct answer was: ' + '*' + player.answer + '*');
            _startNextRound();
        }, ROUND_TIME);
    }

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

    function _setUpRoundQuiz() {
        const url = _buildURL();
        https.get(url, (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            resp.on('end', () => {
                player.setQuiz(_createRoundQuiz(JSON.parse(data).results));
                //
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

    function _buildURL() {
        const baseUrl = 'https://opentdb.com/api.php?';
        let category = player.settings.category;
        let difficulty = player.settings.difficulty;
        let type = player.settings.type;
        let questionsNumPerRound = player.settings.questionsNumberPerRound;
        let url = baseUrl + 'amount=' + question.NUMBER_PER_ROUND[questionsNumPerRound];
        if (question.CATEGORIES[category].apiValue) {
            url += '&category=' + question.CATEGORIES[category].apiValue;
        }
        if (question.DIFFICULTIES[difficulty].apiValue) {
            url += '&difficulty=' + question.DIFFICULTIES[difficulty].apiValue;
        }
        if (question.TYPES[type].apiValue) {
            url += '&type=' + question.TYPES[type].apiValue;
        }
        return url;
    }

    function _createRoundQuiz(results) {
        return results.map(result =>
            Object.assign(
                result,
                extension(result.correct_answer, result.incorrect_answers)
            )
        );

        function extension(corAnswer, incAnswers) {
            let correctOption = Math.floor(Math.random() * (incAnswers.length + 1));
            let possibleAnswers = [
                ...incAnswers.slice(0, correctOption),
                corAnswer,
                ...incAnswers.slice(correctOption)
            ];
            return {
                possibleAnswers: possibleAnswers,
                possibleOptions: Array.from(possibleAnswers, (ans, index) => (index + 1).toString()),
                correctOption: (correctOption + 1).toString()
            }
        }
    }

    function _sendQuestion(){
        let question = player.getQuestion(questionNumber);
        let possibleAnswers = player.getPossibleAnswers(questionNumber);
        player.sendTextMessage(question + '\n' + 'Type the number:\n' + _formatPossibleAnswers(possibleAnswers), 1000);
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
}

const question = require('../constants/const.js').QUESTION;
const https = require('https');
const logger = require('../common/logger');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const StartNewRoundState = require('../models/states/StartNewRoundState.js');