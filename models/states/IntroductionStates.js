exports.WaitingFirstMessageState = WaitingFirstMessageState;
exports.WaitingLanguageState = WaitingLanguageState;
exports.WaitingCategoryState = WaitingCategoryState;
exports.WaitingDifficultyState = WaitingDifficultyState;
exports.WaitingTypeState = WaitingTypeState;

function WaitingFirstMessageState(introductionHandler) {
    this.name = 'WAITING_FIRST_MESSAGE_STATE';
    this.transition = function (stateContext, message) {
        introductionHandler.askLanguage(stateContext, message);
    };
    this.intercept = function(){return false;}
}

function WaitingLanguageState(introductionHandler) {
    this.name = 'WAITING_LANGUAGE_STATE';
    this.transition = function (stateContext, message) {
        introductionHandler.processLanguage(stateContext, message);
    };
    this.intercept = function(){return false;}
}

function WaitingCategoryState(introductionHandler) {
    this.name = 'WAITING_CATEGORY_STATE';
    this.transition = function (stateContext, message) {
        introductionHandler.processCategory(stateContext, message);
    };
    this.intercept = function(){return false;}
}

function WaitingDifficultyState(introductionHandler) {
    this.name = 'WAITING_DIFFICULTY_STATE';
    this.transition = function (stateContext, message) {
        introductionHandler.processDifficulty(stateContext, message);
    };
    this.intercept = function(){return false;}
}

function WaitingTypeState(introductionHandler) {
    this.name = 'WAITING_TYPES_STATE';
    this.transition = function (stateContext, message) {
        introductionHandler.processType(stateContext, message);
    };
    this.intercept = function(){return false;}
}