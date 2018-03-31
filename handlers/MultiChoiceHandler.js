module.exports = MultiChoiceHandler;

function MultiChoiceHandler(initPlayer) {
    let ROUND_TIME = 30000;
    let QUESTIONS = initPlayer.getQuestionsNumberPerRound();
    let questionNumber = 0;
    let correctAnswersNumber = 0;
    let roundTimeout;
    let player = initPlayer;

    this.startRound = function () {
        _resetStatistics();
        _setUpRoundQuiz();
    };

    this.stopRound = function () {
        clearTimeout(roundTimeout);
        player.sendTextMessage(
            'Round is finished. ' +
            _score() + '\n'
        );
        player.changeState(new RoundStoppedState());
    };

    this.processAnswer = function (player) {
        if (player.gaveValidAnswer(questionNumber)) {
            clearTimeout(roundTimeout);
            player.gaveCorrectAnswer(questionNumber) ? _processCorrectAnswer() : _processIncorrectAnswer();
            _startNextRound();
        }
    };

    function _runRoundTimeout() {
        roundTimeout = setTimeout(function () {
            player.sendTextMessage('Time is over.' + '\n' + 'Correct answer was: ' + '*' + player.getCorrectOption(questionNumber) + '*');
            _startNextRound();
        }, ROUND_TIME);
    }

    function _startNextRound() {
        if (questionNumber + 1 <= QUESTIONS) {
            setTimeout(function () {
                questionNumber++;
                _sendQuestion();
                _runRoundTimeout();
            }, 2000)
        } else {
            player.sendTextMessage(
                'Round is finished.' + '\n' +
                _score() + '\n' +
                'Type anything to start new round.',
                1000);
            player.changeState(new RoundStoppedState());
        }
    };

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
                _startNextRound();
            });
        }).on("error", (err) => {
            logger.error("Error: " + err.message, player);
        });
    }

    function _processIncorrectAnswer() {
        player.sendTextMessage("Unfortunately, correct answer was: " + '*' + player.getCorrectOption(questionNumber) + '*');
    }

    function _processCorrectAnswer() {
        correctAnswersNumber++;
        player.sendTextMessage('Correct!');
    }

    function _buildURL() {
        const baseUrl = 'https://opentdb.com/api.php?';
        let category = player.getCategory();
        let difficulty = player.getDifficulty();
        let type = player.getType();
        let url = baseUrl + 'amount=' + player.getQuestionsNumberPerRound();
        if (category.apiValue) {
            url += '&category=' + category.apiValue;
        }
        if (difficulty.apiValue) {
            url += '&difficulty=' + difficulty.apiValue;
        }
        if (type.apiValue) {
            url += '&type=' + type.apiValue;
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

    function _sendQuestion() {
        let question = player.getQuestion(questionNumber);
        let category = player.getQuestionCategory(questionNumber);
        let possibleAnswers = player.getPossibleAnswers(questionNumber);
        player.sendTextMessage(questionNumber + '. ' +
            'Category: ' + category + '\n' +
            question + '\n' +
            'Type the number: \n' +
            _formatPossibleAnswers(possibleAnswers));
    }

    function _formatPossibleAnswers(possibleAnswers) {
        let formattedAnswers = '';
        possibleAnswers.forEach((answer, index) => {
            formattedAnswers += (index + 1) + '. ' + answer + '\n';
        });
        return formattedAnswers;
    }

    function _resetStatistics() {
        questionNumber = 0;
        correctAnswersNumber = 0;
    }

    function _score() {
        return 'Your score: ' + correctAnswersNumber + '/' + questionNumber;
    }
}

const https = require('https');
const logger = require('../common/logger');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const StartNewRoundState = require('../models/states/StartNewRoundState.js');
const RoundStoppedState = require('../models/states/RoundStoppedState.js');