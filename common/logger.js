const winston = require('winston');
require('winston-daily-rotate-file');

let config = winston.config;
let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename: 'app.log',
            level: 'info',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            timestamp: timestamp,
            formatter: formatter
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'error.log',
            timestamp: timestamp,
            formatter: formatter,
            level: 'error'
        }),
        new (winston.transports.Console)({level: 'info'})
    ],
    exceptionHandlers: [
        new (winston.transports.File)({filename: 'exceptions.log'})
    ],
    exitOnError: false
});

function formatter(options) {
    return options.timestamp() + ' ' +
        config.colorize(options.level, options.level.toUpperCase()) + ' ' +
        (options.message ? options.message + ' ' : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
}

function timestamp() {
    return new Date().toLocaleString("en-US");
}

module.exports = logger;