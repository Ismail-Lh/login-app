import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';

import { registerUser } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import AvatarImg from './AvatarImg';
import { useAuthStore } from '../store';
import Button from './Button';

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
		<form className='py-1' onSubmit={formik.handleSubmit}>
			<AvatarImg />

			<div className='textbox flex flex-col items-center gap-6'>
				<input
					{...formik.getFieldProps('email')}
					className={styles.textbox}
					type='text'
					placeholder='Enter your email address'
				/>

				<input
					{...formik.getFieldProps('userName')}
					className={styles.textbox}
					type='text'
					placeholder='Enter your username'
				/>
				<input
					{...formik.getFieldProps('password')}
					className={styles.textbox}
					type='password'
					placeholder='Enter your password'
				/>

				<Button
					isLoading={isLoading}
					loadingText='Registering user...'
					text='Register'
				/>
			</div>

			<div className='text-center py-4'>
				<span className='text-gray-500'>
					Already Register?{' '}
					<Link className='text-red-500' to='/'>
						Login now!
					</Link>
				</span>
			</div>
		</form>
	);
};

export default RegisterForm;
