import toast from 'react-hot-toast';

const verifyField = (errors = {}, values, field) => {
	const pswRegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

	if (!values[field])
		return (errors[field] = toast.error(`${field} required...!`));

	if (values[field].includes(' '))
		return (errors[field] = toast.error(`Invalid ${field}!`));

	if (field === 'password' && values[field].length < 4)
		return (errors[field] = toast.error(
			`Password must be more than 4 characters long!`
		));

	if (field === 'password' && !pswRegExp.test(values[field])) {
		errors.password = toast.error(
			'Password must have special character (!@#$%^&)!'
		);
	}

	return errors;
};

export const validateField = async values => {
	const fieldName = Object.keys(values);

	const errors = verifyField({}, values, fieldName[0]);

	return errors;
};

/** validate reset password */
export async function resetPasswordValidation(values) {
	const fieldName = Object.keys(values);

	const errors = verifyField({}, values, fieldName[0]);

	if (values.password !== values.confirmPassword) {
		errors.exist = toast.error('Password not match...!');
	}

	return errors;
}
