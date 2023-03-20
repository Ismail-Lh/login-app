import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { validateFields } from '../helpers/validate';
import { useAuthStore } from '../store';
import { getUser, login } from '../lib/apiRequest';
import { useEffect } from 'react';

const Password = () => {
	const navigate = useNavigate();

	const { username } = useAuthStore(state => state.auth);

	const { data: user } = useQuery({
		queryKey: ['users', username],
		queryFn: () => getUser(username),
	});

	const {
		mutate: loginUser,
		isError,
		isSuccess,
		data,
		isLoading,
	} = useMutation({
		mutationFn: login,
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

	useEffect(() => {
		if (isSuccess) {
			const token = data.access_token;
			localStorage.setItem('token', token);
			navigate('/profile');
		}

		if (isError) {
			toast.error(<b>Wrong password. Please enter the correct password.</b>);
		}
	}, [isSuccess, isError]);

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>
							Hello {user?.firstName || user?.username}!
						</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Explore More by connecting with us.
						</span>
					</div>

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
							<button type='submit' className={styles.btn} disabled={isLoading}>
								{isLoading ? 'Sign In Loading...' : 'Sign In'}
							</button>
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
				</div>
			</div>
		</div>
	);
};

export default Password;
