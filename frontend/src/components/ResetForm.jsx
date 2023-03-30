import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

import useFormikForm from '../hooks/useFormikForm';
import { createResetSession, resetPassword } from '../lib/apiRequest';
import { useAuthStore } from '../store';
import { resetFields } from '../inputsData';

const initialValues = { password: '', confirmPassword: '' };

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

	const onSubmit = values =>
		resetPasswordMutation({ password: values.password, username });

	const formik = useFormikForm({ initialValues, onSubmit });

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
