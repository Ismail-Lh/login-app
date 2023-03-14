import { logEvents } from '../helpers/logEvents.js';

const errorHandler = (err, req, res, next) => {
	logEvents(
		`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
		'errLogs.log'
	);

	console.log(err.stack);

	const status = res.statusCode ? res.statusCode : 500;

	res.status(status).json({ message: err.message, isError: true });
};

export default errorHandler;
