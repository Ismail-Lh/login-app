import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
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
import credentials from './middleware/credentials.js';
import corsOptions from './config/corsOptions.js';

// ?: CONFIGURATION
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

// ?: GLOBAL MIDDLEWARE
app.use(loggerMiddleware);

// ?: Handle options credentials check - before CORS!
// ?: And fetch cookies credentials requirement
app.use(credentials);

// ?: Cross Origin Resource Sharing
app.use(cors(corsOptions));

// ?: Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// ?: built-in middleware for json
app.use(express.json());

// ?: Middleware for cookies
app.use(cookieParser());

app.use(helmet());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// ?: GENERAL ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

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
