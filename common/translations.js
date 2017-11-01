module.exports = {
    setCurrentLanguage: function(lang){
        currentLanguage = lang;
    },
    get: function(text, params) {
        return localization[currentLanguage][text](params);
    }
};

let currentLanguage = '';
let localization = {
    en: {
        GAME_STOPPED: () => 'Game is stopped.' + '\n' + 'Type anything to continue.',
        PLAYING_LANG: (params) => `We are playing in ${params.lang}!` + '\n' + 'You can always change the language in the future by typing !en or !ru.' + '\n',
        LANG_CHANGED: () => 'Let\'s play in english!.' + '\n' + 'Type anything to start.',
        CORRECT_ANSWER: () => 'Correct!' + '\n' + 'Type anything to continue.'
    },
    ru: {
        GAME_STOPPED: () => 'Игра остановлена' + '\n' + 'Напишите что-нибудь, чтобы продолжить.',
        LANG_CHANGED: () => 'Играем на русском!' +  '\n' + 'Напишите что-нибудь, чтобы начать игру.',
        CORRECT_ANSWER: () => 'Верно!' +  '\n' + 'Напишите что-нибудь, чтобы продолжить.'
    }
};