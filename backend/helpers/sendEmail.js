import nodemailer from 'nodemailer';

const sendEmail = async ({ userEmail, text, emailBody, subject }) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USERNAME, // generated ethereal user
			pass: process.env.EMAIL_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let mailOptions = await transporter.sendMail({
		from: process.env.EMAIL_USERNAME, // sender address
		to: userEmail, // list of receivers
		subject: subject || 'Signup successfully!', // Subject line
		text: text || "Welcome to ou login app! We're exited to have you on board.",
		html: emailBody, // plain text body
	});

	// 3- Send the email
	await transporter.sendMail(mailOptions);
};

export default sendEmail;
