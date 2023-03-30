import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

import { validateFields } from '../helpers/validate';

import { useAuthStore } from '../store';
import { isValidUser } from '../lib/apiRequest';

import Form from './Form';
import { usernameFields } from '../inputsData';

const UsernameForm = () => {
	const navigate = useNavigate();
	const { setUsername } = useAuthStore(state => state);

	const { mutate: isUserExist, isLoading } = useMutation(isValidUser, {
		onSuccess: () => {
			setUsername(formik.values.username);
			navigate('/password');
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const formik = useFormik({
		initialValues: {
			username: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: values => {
			isUserExist(values.username);
		},
	});

	return (
		<Form
			onSubmit={formik.handleSubmit}
			formik={formik}
			isLoading={isLoading}
			btnLoadingText='Checking User...'
			btnText="Let's Go"
			avatar={true}
			fields={usernameFields}
			footerText='Not a Member'
			footerLinkText='Register Now'
			footerRoute='/register'
		/>
	);
};

export default UsernameForm;
