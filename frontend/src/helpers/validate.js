import toast from 'react-hot-toast';

export const validateUsername = async values => {
	const errors = verifyUsername({}, values);

	return errors;
};

const verifyUsername = (error = {}, values) => {
	if (!values.username)
		return (error.username = toast.error('Username required...!'));

	if (values.username.includes(' '))
		return (error.username = toast.error('Invalid username...!'));

	return error;
};
