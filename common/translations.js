module.exports = {
    setCurrentLanguage: function(lang){
        currentLanguage = lang;
    },
    get: function(text, params) {
        return localization[currentLanguage][text](params);
    }
};

let currentLanguage = 'en';
let localization = {
    en: {
        GAME_STOPPED: () => 'Game is stopped.' + '\n' + 'Type anything to continue.',
        LANG_CHANGED: () => 'Let\'s play in english!.' + '\n' + 'Type anything to start.',
        CORRECT_ANSWER: () => 'Correct!' + '\n' + 'Type anything to continue.'
    }
};