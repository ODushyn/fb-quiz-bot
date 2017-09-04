// server and libs
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
//config
const config = require('./config.js');

//quize meta data
const quize = require('./constants/quize.js');

// use process.env.PORT at glitch
const app = express();
app.use(bodyParser.json());
const listener = app.listen(config.server_port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

const state = {};

// fb webhook verification
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});

// get actions from fb through webhook
app.post('/webhook', function (req, res) {
    let data = req.body;
    // Make sure this is a page subscription
    if (data.object === 'page') {
        retrieveMessages(data).forEach((messageEntity) => {
            processMessage(messageEntity);
        });
        // We must send back a 200, within 20 seconds, to let fb know
        // we've successfully received the callback. Otherwise, the request
        // will time out and fb will keep trying to resend.
        res.sendStatus(200);
    }
});

function retrieveMessages(data) {
    let messages = [];
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function (entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function (event) {
            if (event.message) {
                // TODO: add check if there is no text (for example attachment only)
                messages.push({playerId: event.sender.id, text: event.message.text});
            } else {
                console.log("Webhook received unknown event: ", event);
            }
        });
    });
    return messages;
}

function processMessage(message) {
    var playerId = message.playerId;
    var text = message.text;
    var questionId;
    console.log(state);
    if (!state[playerId]) {
        state[playerId] = {};
        questionId = getQuestionId();
        state[playerId].questionId = questionId;
        sendTextMessage(playerId, quize[questionId].question);
        return;
    } else if (state[playerId].status === "WAITING") {
        questionId = getQuestionId();
        state[playerId].questionId = questionId;
        state[playerId].status = "PLAYING";
        sendTextMessage(playerId, quize[questionId].question);
        return;
    } else if (isAnswerCorrect(playerId, text)) {
        sendTextMessage(playerId, "Верно! Напиши еще что-то мне и я тебе задам новый вопрос!");
        state[playerId].status = "WAITING";
        return;
    }
    sendTextMessage(playerId, "Попробуй еще раз у тебя все получится!");
}

function getQuestionId() {
    return Math.floor((Math.random() * 4) + 1);
}

function isAnswerCorrect(playerId, playerAnswer) {
    let answers = quize[state[playerId].questionId].answers;
    return answers.indexOf(playerAnswer) > -1;
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
            console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}