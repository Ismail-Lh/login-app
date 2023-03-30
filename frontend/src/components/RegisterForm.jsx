import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Form from './Form';

import useFormikForm from '../hooks/useFormikForm';
import { registerUser } from '../lib/apiRequest';
import { useAuthStore } from '../store';
import { registerFields } from '../inputsData';

const initialValues = {
	userName: '',
	email: '',
	password: '',
};

const RegisterForm = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { profileImg } = useAuthStore(state => state.auth);

	const { mutate: createNewUser, isLoading } = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['users'], { exact: true });
			navigate('/');
		},
		onError: error => {
			toast.error(error?.response.data.message);
		},
	});

	const onSubmit = values => {
		values = Object.assign(values, { profile: profileImg || '' });

		createNewUser(values);
	};

	const formik = useFormikForm({ initialValues, onSubmit });

	return (
		<Form
			onSubmit={formik.handleSubmit}
			formik={formik}
			isLoading={isLoading}
			btnLoadingText='Registering user...'
			btnText='Register'
			avatar={false}
			fields={registerFields}
			footerText='Already Register?'
			footerLinkText='Login Now'
			footerRoute='/'
			flexContainer={true}
		/>
	);
};

export default RegisterForm;
