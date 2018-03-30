const request = require('request');
const logger = require('./logger');

exports.sendTextMessage = function (recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    send(messageData);
};

function send(params) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: params

    }, function (error, response, body) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;
        if (!error && response.statusCode == 200) {
            logger.info("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            logger.error("Unable to send message with id %s to recipient %s", messageId, recipientId);
        }
    });
}