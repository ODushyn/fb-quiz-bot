# fb-quiz-bot
The bot for playing quiz on Facebook via Messanger

First priority tasks list: 

- [x] Add basic functions for receiving and sending messages to a player.
- [x] Random message - Random Question - Answer game with a state on the server side.
- [ ] Think about rules for the simpliest single game implementation.
- [ ] Add basic instruction commands.
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
// - move reset function from states to State prototype
// - show message "Almost correct!" when one letter is incorrect in the answer
// - add instruction description to the fb page
// - and possibillity to specify tip interval to the user
// - https://opentdb.com/api_config.php
// - http://viquiz.ru/wiki/skachat-voprosy-viktoriny

