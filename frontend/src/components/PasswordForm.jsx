import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';

import Form from './Form';
import Input from './Input';
import Button from './Button';
import FormFooter from './FormFooter';
import Avatar from './Avatar';

import { validateFields } from '../helpers/validate';
import { login } from '../lib/apiRequest';
import { useAuthStore } from '../store';

const PasswordForm = ({ user }) => {
	const navigate = useNavigate();

	const {
		setUser,
		setAccessToken,
		auth: { username },
	} = useAuthStore(state => state);

	const { mutate: loginUser, isLoading } = useMutation(login, {
		onSuccess: data => {
			setUser(user);
			setAccessToken(data.access_token);
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
		<Form onSubmit={formik.handleSubmit}>
			<Avatar img={user?.profile} />

			<div className='textbox flex flex-col items-center gap-6'>
				<Input
					className={styles.textbox}
					type='password'
					placeholder='Enter your password'
					name='password'
					formik={formik}
				/>
				<Button
					isLoading={isLoading}
					loadingText='Sign In Loading...'
					text='Sign In'
				/>
			</div>

			<FormFooter
				text='Forgot Password'
				linkText='Recover Now'
				route='/recovery'
			/>
		</Form>
	);
};

export default PasswordForm;
