import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';

import { resetPasswordValidation } from '../helpers/validate';

import styles from '../styles/Username.module.css';

const Reset = () => {
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: resetPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			console.log(values);
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
								type='password'
								placeholder='Enter new password'
							/>
							<input
								{...formik.getFieldProps('confirmPassword')}
								className={styles.textbox}
								type='password'
								placeholder='Confirm password'
							/>

							<button type='submit' className={styles.btn}>
								Reset Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Reset;
