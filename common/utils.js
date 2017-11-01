const ANSWER_SPECIAL_SYMBOLS = require('../constants/const.js').ANSWER_SPECIAL_SYMBOLS;

exports.maskAnswer = function(answer) {
    let maskedAnswer = Array.from(answer);
    maskedAnswer.forEach((char, index) => {
        if(ANSWER_SPECIAL_SYMBOLS.includes(char)) {
            maskedAnswer[index] = char;
            return;
        }
        maskedAnswer[index] = '#'
    });
    return maskedAnswer.join('');
};

exports.removeAnswerSpecialSymbols = function(answer) {
    let cleanAnswer = answer;
    ANSWER_SPECIAL_SYMBOLS.forEach((symbol) => {
        cleanAnswer = cleanAnswer.replace(symbol, '');
    });
    return cleanAnswer;
}