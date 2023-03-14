import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', true);

		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
	} catch (err) {
		console.log(`Error: ${err.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
