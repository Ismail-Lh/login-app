import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { validateFields } from '../helpers/validate';
import { convertToBase64 } from '../helpers/convert';

const Register = () => {
	const [file, setFile] = useState();

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			values = await Object.assign(values, { profile: file || '' });
			console.log(values);
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
						<h4 className='text-5xl font-bold'>Register</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Happy to join you!
						</span>
					</div>

					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<label htmlFor='profile'>
								<img
									src={file || avatar}
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
							<input
								{...formik.getFieldProps('email')}
								className={styles.textbox}
								type='text'
								placeholder='Enter your email address'
							/>
							<input
								{...formik.getFieldProps('username')}
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
							<button type='submit' className={styles.btn}>
								Register
							</button>
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
				</div>
			</div>
		</div>
	);
};

export default Register;
