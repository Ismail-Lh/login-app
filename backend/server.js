import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/connectDB.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import corsOptions from './config/corsOptions.js';

// ?: CONFIGURATION
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

// ?: GLOBAL MIDDLEWARE
app.use(loggerMiddleware);

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.disable('x-powered-by');

// ?: GENERAL ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// ?: NOT FOUND ROUTES
// app.all('*', (req, res) => {
// 	res.status(404);
// 	if (req.accepts('html')) {
// 		res.sendFile(path.join(__dirname, 'views', '404.html'));
// 	} else if (req.accepts('json')) {
// 		res.json({ message: '404 Not Found!' });
// 	} else {
// 		res.type('txt').send('404 Not Found!');
// 	}
// });

// ?: GLOBAL ERROR HANDLER MIDDLEWARE
app.use(errorMiddleware);

// ?: SERVER AND DATABASE CONNECTION
// !: run the server only when we have a valid DB connection
connectDB().then(() =>
	app.listen(PORT, () =>
		console.log(
			`Server running in ${NODE_ENV} mode on port http://localhost:${PORT}`
				.yellow.underline.bold
		)
	)
);
