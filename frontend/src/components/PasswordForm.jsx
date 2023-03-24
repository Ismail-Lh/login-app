import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';

import Button from './Button';

import { validateFields } from '../helpers/validate';
import { getUser, login } from '../lib/apiRequest';
import { useAuthStore } from '../store';

const PasswordForm = () => {
	const navigate = useNavigate();
	const {
		setUser,
		auth: { username },
	} = useAuthStore(state => state);

	const { data: user } = useQuery({
		queryKey: ['users', username],
		queryFn: () => getUser(username),
	});

	console.log(user);

	const { mutate: loginUser, isLoading } = useMutation(login, {
		onSuccess: ({ access_token }) => {
			setUser(user);
			localStorage.setItem('token', access_token);
			navigate('/profile');
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			loginUser({ username, password: values.password });
		},
	});

	return (
		<form className='py-1' onSubmit={formik.handleSubmit}>
			<div className='profile flex justify-center py-4'>
				<img
					src={user?.profile || avatar}
					className={styles.profile_img}
					alt='avatar'
				/>
			</div>

			<div className='textbox flex flex-col items-center gap-6'>
				<input
					{...formik.getFieldProps('password')}
					className={styles.textbox}
					type='password'
					placeholder='Enter your password'
				/>
				<Button
					isLoading={isLoading}
					loadingText='Sign In Loading...'
					text='Sign In'
				/>
			</div>

			<div className='text-center py-4'>
				<span className='text-gray-500'>
					Forgot Password{' '}
					<Link className='text-red-500' to='/recovery'>
						Recover Now
					</Link>
				</span>
			</div>
		</form>
	);
};

export default PasswordForm;
