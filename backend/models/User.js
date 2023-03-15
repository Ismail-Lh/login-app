import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// !: Compare the password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// !: Password encryption (hash)
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
