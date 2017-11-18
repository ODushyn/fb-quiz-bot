const fbQuizServer = require("../server");
const fbUtils = require('../common/fbUtils');
const webHook = require('../webHook');
var request = require('request');
var httpMocks = require('node-mocks-http');

describe('fb-quiz server', function () {

    describe('webhook POST', function () {
        const players = [0, 1];
        const texts = ['Hello', 'Good buy'];
        const body = {
            object: 'page',
            entry: [
                {
                    messaging: [
                        {message: {text: texts[0]}, sender: {id: players[0]}},
                        {message: {text: texts[1]}, sender: {id: players[1]}}
                    ]
                }
            ]
        };
        let response;
        let request;

        beforeEach(function () {
            request = httpMocks.createRequest({
                method: 'POST', url: '/webhook',
                body: body
            });
            response = httpMocks.createResponse();
        });

        it("must return 200", function () {
            expect(response.statusCode).toBe(200);
        });

        it("must retrieve page messages", function () {
            spyOn(fbUtils, 'retrievePageMessages').and.callThrough();

            fbQuizServer.webhookPOST(request, response);

            expect(fbUtils.retrievePageMessages.calls.count()).toEqual(1);
        });

        it("must proceed each entity", function () {
            spyOn(webHook, 'proceed').and.callThrough();

            fbQuizServer.webhookPOST(request, response);

            expect(webHook.proceed.calls.count()).toEqual(body.entry[0].messaging.length);
            expect(webHook.proceed).toHaveBeenCalledWith(players[0], texts[0]);
            expect(webHook.proceed).toHaveBeenCalledWith(players[1], texts[1]);
        });
    });

    describe('webhook POST', function () {

        const query = {
            'hub.challenge': 'challenge',
            'hub.verify_token': 'secret_token'
        };
        let response;
        let request;

        beforeEach(function () {
            process.env.VERIFY_TOKEN = 'secret_token';
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/webhook',
                query: query
            });
            response = httpMocks.createResponse();
        });

        it('must return hub.challenge if token is valid', () => {
            fbQuizServer.webhookGET(request, response);
            expect(response._getData()).toBe('challenge');
        });

        it('must return error if token is invalid', () => {
            process.env.VERIFY_TOKEN = 'invalid_token';
            fbQuizServer.webhookGET(request, response);
            expect(response.statusCode).toBe(401);
            expect(response._getData()).toBe('Error, wrong validation token');
        });

        afterEach(() => {
            delete process.env.NODE_ENV;
        });
    });
});