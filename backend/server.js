import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

// ?: CONFIGURATION
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

// ?: GLOBAL MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// ?: GLOBAL ROUTES
// app.use('/', express.static(path.join(__dirname, 'public')));

// app.use('/', globalRoute);

// ?: GENERAL ROUTES
// app.use('/api/users', userRoutes);
// app.use('/api/notes', noteRoutes);
// app.use('/api/auth', authRoutes);

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
// app.use(errorHandler);

// ?: SERVER
app.listen(PORT, () =>
	console.log(
		`Server running in ${NODE_ENV} mode on port http://localhost:${PORT}`.yellow
			.underline.bold
	)
);