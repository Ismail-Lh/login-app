import { Link, Navigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { validateFields } from '../helpers/validate';
import { useAuthStore } from '../store';
import { getUser } from '../lib/apiRequest';

const Password = () => {
	const queryClient = useQueryClient();

	const { username } = useAuthStore(state => state.auth);

	const {
		data: user,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['Users', username],
		queryFn: () => getUser(username),
	});

	// const { mutate } = useMutation(login, {
	// 	onSuccess: () => {
	// 		// Invalidates cache and refetch
	// 		queryClient.invalidateQueries('Users');
	// 	},
	// });

	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			console.log(values);
		},
	});

	if (isLoading)
		return (
			<div className='flex justify-center items-center h-screen'>
				<h1 className='text-2xl font-bold'>Loading...</h1>
			</div>
		);

	if (isError)
		return (
			<div className='flex justify-center items-center h-screen'>
				<h1 className='text-2xl font-bold text-red-500'>
					{error?.response.data.message}
				</h1>
			</div>
		);

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
							<button type='submit' className={styles.btn}>
								Sign In
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
