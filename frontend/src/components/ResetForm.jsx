import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

import { validateFields } from '../helpers/validate';
import { createResetSession, resetPassword } from '../lib/apiRequest';
import { useAuthStore } from '../store';
import { resetFields } from '../inputsData';

const ResetForm = () => {
	const navigate = useNavigate();

	const { username } = useAuthStore(state => state.auth);

	const resetQuery = useQuery({
		queryKey: ['Reset'],
		queryFn: createResetSession,
		onError: error => {
			toast.error(error?.response.data.message);
		},
		refetchOnWindowFocus: false,
	});

	const { mutate: resetPasswordMutation, isLoading } = useMutation({
		mutationFn: resetPassword,
		onSuccess: data => {
			toast.success(data?.data.message);
			navigate('/');
		},
		onError: error => {
			toast.error(error?.response.data.message);
		},
	});

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			resetPasswordMutation({ password: values.password, username });
		},
	});

	return (
		<Form
			onSubmit={formik.handleSubmit}
			formik={formik}
			isLoading={isLoading}
			btnLoadingText='Password resetting...'
			btnText='Reset Password'
			fields={resetFields}
			flexContainer={true}
		/>
	);
};

export default ResetForm;
