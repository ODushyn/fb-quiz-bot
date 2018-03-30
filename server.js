// server and libs
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./common/logger');
const config = require('./config.js');
const fbUtils = require('./common/fbUtils');
const webHook = require('./webHook.js');

const app = express();
app.use(bodyParser.json());

const listener = app.listen(config.port, function () {
    logger.info('Your app is listening on port ' + listener.address().port);
});

// fb webhook verification
app.get('/webhook', webhookGET);
// get actions from fb through webhook
app.post('/webhook', webhookPOST);

function webhookGET(req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.status(401).send('Error, wrong validation token');
    }
}

function webhookPOST(req, res) {
    let data = req.body;
    if (data.object === 'page') {
        fbUtils.retrievePageMessages(data).forEach((messageEntity) => {
            webHook.proceed(messageEntity.playerId, messageEntity.text);
        });
    }
    // We must send back a 200, within 20 seconds, to let fb know
    // we've successfully received the callback. Otherwise, the request
    // will time out and fb will keep trying to resend.
    res.sendStatus(200);
}

app.use(function logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
});

module.exports = {webhookPOST, webhookGET};