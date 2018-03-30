const winston = require('winston');

let config = winston.config;
let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename: 'app.log',
            level: 'info',
            timestamp: () => {
                return new Date().toLocaleString("en-US");
            },
            formatter: function(options) {
                // - Return string will be passed to logger.
                // - Optionally, use options.colorize(options.level, <string>) to
                //   colorize output based on the log level.
                return options.timestamp() + ' ' +
                    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        }),
        new (winston.transports.Console)({ level: 'error' })
    ],
    exceptionHandlers: [
        new (winston.transports.File)({ filename: 'exceptions.log'})
    ],
    exitOnError: false
});

module.exports = logger;