import { logEvents } from '../helpers/logEvents.js';

const loggerMiddleware = (req, res, next) => {
	logEvents(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLogs.log');

	next();
};

export default loggerMiddleware;
