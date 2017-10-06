exports.maskAnswer = function(answer) {
    let specialSymbols = ['-', ' '];
    let maskedAnswer = Array.from(answer);
    console.log(maskedAnswer);
    maskedAnswer.forEach((char, index) => {
        if(specialSymbols.indexOf(char) !== -1){
            maskedAnswer[index] = char;
            return;
        }
        maskedAnswer[index] = '#'
    });
    return maskedAnswer.join('');
};

exports.removeSpecialSymbols = function(answer) {
    return answer.replace(/-|\s/g, '');
}