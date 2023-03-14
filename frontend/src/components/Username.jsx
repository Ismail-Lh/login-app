import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { validateFields } from '../helpers/validate';

const Username = () => {
	const formik = useFormik({
		initialValues: {
			username: '',
		},
		validate: validateFields,
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
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Hello Again!</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Explore More by connecting with us.
						</span>
					</div>

					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<img src={avatar} className={styles.profile_img} alt='avatar' />
						</div>

						<div className='textbox flex flex-col items-center gap-6'>
							<input
								{...formik.getFieldProps('username')}
								className={styles.textbox}
								type='text'
								placeholder='Username'
							/>
							<button type='submit' className={styles.btn}>
								Let's Go
							</button>
						</div>

						<div className='text-center py-4'>
							<span className='text-gray-500'>
								Not a Member{' '}
								<Link className='text-red-500' to='/register'>
									Register Now
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Username;
