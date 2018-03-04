# fb-quiz-bot
The bot for playing quiz on Facebook via Messanger

First priority tasks list: 

- [x] Add basic functions for receiving and sending messages to a player.
- [x] Random message - Random Question - Answer game with a state on the server side.
- [x] Think about rules for the simpliest single game implementation.
- [x] Add basic instruction commands.
- [ ] Update facebook profile for quiz page.
- [ ] Beta release
- [ ] Add tests for the game above. 
- [ ] Add test for game with friend (TDD!!!)
- [ ] Add game with a friend.
- [ ] Fill questions for quiz
- [ ] Make release!

Issues:
- [ ] _tipCharsNumber improve function. It shows the answer on the second round if answer is one character long
- [ ] Messenger does not always get messages in the order they were sent. 
        (https://stackoverflow.com/questions/37152355/facebook-messenger-bot-not-sending-messages-in-order)
         
// + tips should be constant after each response
// + produce 2 tips which depend on chars number for each question
// + stop after 2 tips, show answer and ask to type anything to continue.
// + add basic commands set: start(type anything), stop(!), skip(-).
// + show asnwer if player does not provide correct one. add time between last tip and correct answer
// + add english version 
// - decode english questions
// - add instruction description to the fb page and start message
// - add log file


Postponed:
// +- create Factory for handlers (not usre if it's needed)
// +- show message "Almost correct!" when one letter is incorrect in the answer (might be postponed)
// +- add possibility to specify tip interval to the user (may be postponed)

Question:
// - https://opentdb.com/api_config.php
// - http://viquiz.ru/wiki/skachat-voprosy-viktoriny
Categories:
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
    + '21. Vehicles \n '
    + '22. Entertainment: Comics \n '
    + '23. Science: Gadgets \n '
    + '24. Entertainment: Japanese Anime & Manga \n '
    + '25. Entertainment: Cartoon & Animations \n ');
    
    
    Description:
- `server.js` keeps endpoints    
- `StateContext` main state interface with two methods: `changeState` and `processMessage`
- `Player.js` keeps player related data
-  `/states` folder keeps all possible states