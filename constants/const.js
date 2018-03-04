module.exports = {
    ANSWER_SPECIAL_SYMBOLS: [' ', '-'],
    LANGUAGES: {
        "1": {shortcut: 'en'},
        "2": {shortcut: 'ru'}
    },
    QUESTION: {
        CATEGORIES: {
            "1": {name: "Random Category", apiValue: ""},
            "2": {name: "General Knowledge", apiValue: "9"},
            "3": {name: "Entertainment: Books", apiValue: "10"},
            "4": {name: "Entertainment: Film", apiValue: "11"},
            "5": {name: "Entertainment: Music", apiValue: "12"},
            "6": {name: "Entertainment: Musicals & Theatres", apiValue: "13"},
            "7": {name: "Entertainment: Television", apiValue: "14"},
            "8": {name: "Entertainment: Video Games", apiValue: "15"},
            "9": {name: "Entertainment: Board Games", apiValue: "16"},
            "10": {name: "Science & Nature", apiValue: "17"}
        },
        TYPES: {
            "1": {name: "Random type", apiValue: ""},
            "2": {name: "Multiple choice", apiValue: "multiple"},
            "3": {name: "True / False", apiValue: "boolean"}
        },
        DIFFICULTIES: {
            "1": {name: "Random difficulty", apiValue: ""},
            "2": {name: "Easy", apiValue: "easy"},
            "3": {name: "Medium", apiValue: "medium"},
            "4": {name: "Hard", apiValue: "hard"}
        }
    },
    INTRODUCTION: {
        ASK_CATEGORY: ' Choose question category: \n'
        + '1. Random Category. \n'
        + '2. General Knowledge \n'
        + '3. Entertainment: Books \n'
        + '4. Entertainment: Film \n'
        + '5. Entertainment: Music \n'
        + '6. Entertainment: Musicals & Theatres \n'
        + '7. Entertainment: Television \n'
        + '8. Entertainment: Video Games \n'
        + '9. Entertainment: Board Games \n'
        + '10. Science & Nature \n'
        + '11. Science: Computers \n'
        + '12. Science: Mathematics \n'
        + '13. Mythology \n'
        + '14. Sports \n'
        + '15. Geography \n'
        + '16. History \n'
        + '17. Politics \n'
        + '18. Art \n'
        + '19. Celebrities \n'
        + '20. Animals \n'
        + '21. Vehicles \n',
        ASK_TYPES: 'Choose questions type: \n'
        + '1. Random type \n'
        + '2. Multiple choice \n'
        + '3. True / False \n',
        ASK_DIFFICULTY: 'Choose difficulty: \n'
        + '1. Random difficulty\n'
        + '2. Easy \n'
        + '3. Medium \n'
        + '4. Hard \n'
    }
};