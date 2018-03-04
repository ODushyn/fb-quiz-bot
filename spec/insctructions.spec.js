describe('intercept module', () => {
    let player;

    beforeEach(function () {
        player = new Player();
    });

    describe('intercept', () => {

        fit('should stop round on "!" command', () => {
            console.log(player);
            spyOn(player, 'reset');
            instructionsInterceptor('!', );
            expect(player.reset.calls.count()).toEqual(1);
        });

        xit('should change state to LookingForStartOptionStateRu on "!" command', () => {

        });

        xit('should reset player on "-" command', () => {

        });

        xit('should change state to PreparingQuizQuestionStateRu on "-" command', () => {

        });

        xit('should return true if instruction command', () => {

        });

        xit('should return false if not instruction command', () => {

        });
    });
});

const instructionsInterceptor = require('../handlers/InstructionsInterceptor');
const Player = require('../models/Player');
const LookingForStartOptionState = require('../models/states/LookingForStartOptionState.js');
const WaitingForQuizAnswerState = require('../models/states/WaitingForQuizAnswerState');