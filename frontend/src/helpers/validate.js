import toast from 'react-hot-toast';

const pswRegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const verifyFields = (errors = {}, values) => {
	const fieldsName = Object.keys(values);

	fieldsName.forEach(async field => {
		if (field !== 'username' || field !== 'email' || field !== 'password')
			return;

		if (!values[field])
			return (errors[field] = toast.error(`${field} required...!`));

		if (values[field].includes(' '))
			return (errors[field] = toast.error(`Invalid ${field}!`));

		if (field === 'password') {
			if (values.password.length < 4)
				return (errors[field] = toast.error(
					`Password must be more than 4 characters long!`
				));

			if (!pswRegExp.test(values.password))
				return (errors.password = toast.error(
					'Password must have special character (!@#$%^&)!'
				));

			if (values.password && values.confirmPassword) {
				if (values.password !== values.confirmPassword)
					return (errors.exist = toast.error('Passwords not match...!'));
			}
		}

		if (field === 'email') {
			if (!emailRegExp.test(values.email))
				return (errors.email = toast.error('Invalid email address...!'));
		}
	});

	return errors;
};

export const validateFields = async values => {
	const errors = verifyFields({}, values);

	return errors;
};
