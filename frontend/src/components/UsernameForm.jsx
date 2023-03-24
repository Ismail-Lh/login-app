import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { validateFields } from '../helpers/validate';

import { useAuthStore } from '../store';
import { isValidUser } from '../lib/apiRequest';
import Button from '../components/Button';

const UsernameForm = () => {
	const navigate = useNavigate();
	const { setUsername } = useAuthStore(state => state);

	const { mutate: isUserExist, isLoading } = useMutation(isValidUser, {
		onSuccess: () => {
			setUsername(formik.values.username);
			navigate('/password');
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const formik = useFormik({
		initialValues: {
			username: 'ismail',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			isUserExist(values.username);
		},
	});

	return (
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
				<Button
					isLoading={isLoading}
					loadingText='Checking User...'
					text="Let's Go"
				/>
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
	);
};

export default UsernameForm;
