import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

import Form from './Form';

import { registerUser } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import { useAuthStore } from '../store';
import { registerFields } from '../inputsData';

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

	const formik = useFormik({
		initialValues: {
			userName: '',
			email: '',
			password: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			values = Object.assign(values, { profile: profileImg || '' });

			createNewUser(values);
		},
	});

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
