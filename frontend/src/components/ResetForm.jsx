import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Username.module.css';

import Form from './Form';
import Button from './Button';
import Input from './Input';

import { validateFields } from '../helpers/validate';
import { createResetSession, resetPassword } from '../lib/apiRequest';
import { useAuthStore } from '../store';

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

	const fields = [
		{ name: 'password', type: 'text', placeholder: 'Enter new password' },
		{
			name: 'confirmPassword',
			type: 'text',
			placeholder: 'Confirm password',
		},
	];

	return (
		<Form onSubmit={formik.handleSubmit}>
			<div className={styles.flex_container}>
				{fields.map(({ name, type, placeholder }) => (
					<Input
						key={name}
						type={type}
						placeholder={placeholder}
						name={name}
						formik={formik}
					/>
				))}

				<Button
					isLoading={isLoading}
					loadingText='Password resetting...'
					text='Reset Password'
				/>
			</div>
		</Form>
	);
};

export default ResetForm;
