import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';

import { validateFields } from '../helpers/validate';
import { convertToBase64 } from '../helpers/convert';

import { useAuthStore } from '../store';
import { logout, updateCurrentUser } from '../lib/apiRequest';

const Profile = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const [file, setFile] = useState();

	const {
		auth: { user },
		setUser,
	} = useAuthStore(state => state);

	const { mutate: updateUser, isLoading } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: data => {
			setUser(data?.user);
			toast.success(<b>{data?.message}</b>);
			queryClient.invalidateQueries(['users']);
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const { mutate: logoutUser } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			localStorage.removeItem('token');
			navigate('/');
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const formik = useFormik({
		initialValues: {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			mobile: user?.mobile || '',
			address: user?.address || '',
			email: user?.email || '',
		},
		enableReinitialize: true,
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			values = Object.assign(values, { profile: file || user?.profile || '' });

			const token = localStorage.getItem('token');

			updateUser({ values, token });
		},
	});

	const handleUpload = async e => {
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass} style={{ width: '50%' }}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Profile</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							You can update your profile details.
						</span>
					</div>

					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<label htmlFor='profile'>
								<img
									src={user?.profile || file || avatar}
									className={styles.profile_img}
									alt='avatar'
								/>
							</label>

							<input
								type='file'
								name='profile'
								id='profile'
								accept='image/*'
								onChange={handleUpload}
							/>
						</div>

						<div className='textbox flex flex-col items-center gap-6'>
							<div className='name flex w-3/4 gap-10'>
								<input
									{...formik.getFieldProps('firstName')}
									className={styles.textbox}
									type='text'
									placeholder='FirstName'
								/>
								<input
									{...formik.getFieldProps('lastName')}
									className={styles.textbox}
									type='text'
									placeholder='LastName'
								/>
							</div>

							<input
								{...formik.getFieldProps('mobile')}
								className={styles.textbox}
								type='text'
								placeholder='Mobile No.'
							/>
							<input
								{...formik.getFieldProps('email')}
								className={styles.textbox}
								type='text'
								placeholder='Email address'
							/>

							<input
								{...formik.getFieldProps('address')}
								className={styles.textbox}
								type='text'
								placeholder='Address'
							/>

							<button type='submit' className={styles.btn} disabled={isLoading}>
								{isLoading ? 'Updating user...' : 'Update'}
							</button>
						</div>

						<div className='text-center py-4'>
							<span className='text-gray-500'>
								Come back later.{' '}
								<button
									type='button'
									className='text-red-500'
									onClick={logoutUser}>
									Logout!
								</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
