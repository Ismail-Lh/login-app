import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { validateFields } from '../helpers/validate';
import { createResetSession, resetPassword } from '../lib/apiRequest';
import { useAuthStore } from '../store';

import styles from '../styles/Username.module.css';

const Reset = () => {
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
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass} style={{ width: '50%' }}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Reset Password!</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Enter new password.
						</span>
					</div>

					<form className='pt-20' onSubmit={formik.handleSubmit}>
						<div className='textbox flex flex-col items-center gap-6'>
							<input
								{...formik.getFieldProps('password')}
								className={styles.textbox}
								type='text'
								placeholder='Enter new password'
							/>
							<input
								{...formik.getFieldProps('confirmPassword')}
								className={styles.textbox}
								type='text'
								placeholder='Confirm password'
							/>

							<button type='submit' className={styles.btn} disabled={isLoading}>
								{isLoading ? 'Password resetting...' : 'Reset Password'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Reset;
