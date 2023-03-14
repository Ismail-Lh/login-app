import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter a unique Username.'],
			unique: [true, 'Username already exist. Please enter another one.'],
		},
		email: {
			type: String,
			required: [true, 'Please enter an Email Address.'],
			unique: true,
		},
		password: { type: String, required: [true, 'Please enter a Password.'] },
		firstName: { type: String },
		lastName: { type: String },
		address: { type: String },
		profile: { type: String },
		mobile: { type: Number },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
