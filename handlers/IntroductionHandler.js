module.exports = IntroductionHandler;

function IntroductionHandler(player) {

    this.askLanguage = function(stateContext, message) {
        player.sendTextMessage('Choose the language. Выберите язык. \n 1. English \n 2. Русский');
        stateContext.changeState(new introductionsStates.WaitingLanguageState(this));
    };

    this.processLanguage = function(stateContext, langNum) {
        let lang = Object.getOwnPropertyNames(consts.LANGUAGES).includes(langNum);
        if(lang) {
            player.language = consts.LANGUAGES[langNum].shortcut;
            translations.setCurrentLanguage(consts.LANGUAGES[langNum].shortcut);
            // TODO: think about factory here
            if(langNum === '1'){
                player.sendTextMessage(translations.get('PLAYING_LANG', {lang: 'english'}) + ' Choose question category: \n '
                    + '1. Random Category. \n '
                    + '2. General Knowledge \n '
                    + '3. Entertainment: Books \n '
                    + '4. Entertainment: Film \n '
                    + '5. Entertainment: Music \n '
                    + '6. Entertainment: Musicals & Theatres \n '
                    + '7. Entertainment: Television \n '
                    + '8. Entertainment: Video Games \n '
                    + '9. Entertainment: Board Games \n '
                    + '10. Science & Nature \n '
                    + '11. Science: Computers \n '
                    + '12. Science: Mathematics \n '
                    + '13. Mythology \n '
                    + '14. Sports \n '
                    + '15. Geography \n '
                    + '16. History \n '
                    + '17. Politics \n '
                    + '18. Art \n '
                    + '19. Celebrities \n '
                    + '20. Animals \n '
                    + '21. Vehicles \n ');
                stateContext.changeState(new introductionsStates.WaitingCategoryState(this));
            }
            if(langNum === '2'){
                stateContext.changeState(new LookingForStartOptionState(new HandlerRu(player)));
            }
        } else {
            // send message 'please type a number'
        }
    };

    this.processCategory = function(stateContext, categoryNum) {
        console.log(Object.getOwnPropertyNames(consts.QUESTION.CATEGORIES));
        let category = Object.getOwnPropertyNames(consts.QUESTION.CATEGORIES).includes(categoryNum);
        if(category) {
            player.settings.category = categoryNum;
            player.sendTextMessage('Choose difficulty: \n'
                + '1. Random difficulty'
                + '2. Easy \n'
                + '3. Medium \n'
                + '4. Hard \n');
            stateContext.changeState(new introductionsStates.WaitingDifficultyState(this));
        } else {
            // send message 'please type a number'
        }

    };

    this.processDifficulty = function(stateContext, difficultyNum) {
        let difficulty = Object.getOwnPropertyNames(consts.QUESTION.DIFFICULTIES).includes(difficultyNum);
        if(difficulty){
            player.settings.difficulty = difficultyNum;
            player.sendTextMessage('Choose questions type: \n '
                + '1. Random type'
                + '2. Multiple choice \n '
                + '3. True / False \n ');
            stateContext.changeState(new introductionsStates.WaitingTypeState(this));
        } else {
            // send message 'please type a number'
        }

    };

    this.processType = function(stateContext, typeNum) {
        let type = Object.getOwnPropertyNames(consts.QUESTION.TYPES).includes(typeNum);
        if(type){
            player.settings.type = typeNum;
            //it depence on language right now
            console.log(player.settings);
            stateContext.changeState(new LookingForStartOptionState((new MultipleChoiceHandler(player))));
        } else {
            // send message 'please type a number'
        }
    }
}

const MultipleChoiceHandler = require('./HandlerEn.js');
const HandlerRu = require('./HandlerRu.js');
const introductionsStates = require('../models/states/IntroductionStates.js');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const consts = require('../constants/const.js');
const translations = require('../common/translations');