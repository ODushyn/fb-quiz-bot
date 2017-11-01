// server and libs
const express = require('express');
const bodyParser = require('body-parser');
//const request = require('request');
const config = require('./config.js');
const fbUtils = require('./common/fbUtils');
const webHook = require('./webHook.js');

// use process.env.PORT at glitch
const app = express();
app.use(bodyParser.json());
const listener = app.listen(config.server_port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});


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
    console.log(req.body);
    let data = req.body;
    // Make sure this is a page subscription
    if (data.object === 'page') {
        fbUtils.retrievePageMessages(data).forEach((messageEntity) => {
            webHook.proceed(messageEntity.playerId, messageEntity.text);
        });
    }
    // We must send back a 200, within 20 seconds, to let fb know
    // we've successfully received the callback. Otherwise, the request
    // will time out and fb will keep trying to resend.
    res.sendStatus(200);
});