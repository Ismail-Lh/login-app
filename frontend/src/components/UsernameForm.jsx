import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../store';
import { isValidUser } from '../lib/apiRequest';
import useFormikForm from '../hooks/useFormikForm';

import Form from './Form';
import { usernameFields } from '../inputsData';

const initialValues = {
	username: '',
};

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

	const onSubmit = values => isUserExist(values.username);

	const formik = useFormikForm({ initialValues, onSubmit });

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
