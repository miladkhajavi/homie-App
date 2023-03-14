import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import moment from 'jalali-moment'

const options = {
    file: {
        level: "info",
        filename: `${process.cwd()}/logs/app.log`,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, //5MB
        maxFile: 5,
    },
    show: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    daily: {
        level: "info",
        filename: 'logs/%DATE%.log',
        filename: `${process.cwd()}/logs/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        handleExceptions: true,
        zippedArchive: true,
        format: winston.format.json(),
        maxSize: 5242880, //5MB
        maxFile: 5,

    }
}

// persian date and time

let date = moment().locale('fa').format('YYYY/M/D').toString();
let date_ob = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tehran"
});
date_ob = new Date(date_ob);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
// customize

let input = `- [${date} - ${hours}:${minutes}:${seconds}] -`

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
    transports: [
        // new winston.transports.File(options.file),
        new winston.transports.DailyRotateFile(options.daily),
        new winston.transports.Console(options.show),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        let MSG = message.concat(input); //add customized into message
        logger.info(MSG);
    },
};

export default logger;