import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';

import { validateFields } from '../helpers/validate';

import { useAuthStore } from '../store';
import { getUser, isValidUser } from '../lib/apiRequest';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Avatar from './Avatar';
import FormFooter from './FormFooter';

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
			username: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			isUserExist(values.username);
		},
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Avatar />

			<div className='textbox flex flex-col items-center gap-6'>
				<Input name='username' formik={formik} placeholder='Username' />
				<Button
					isLoading={isLoading}
					loadingText='Checking User...'
					text="Let's Go"
				/>
			</div>

			<FormFooter
				text='Not a Member'
				linkText='Register Now'
				route='/register'
			/>
		</Form>
	);
};

export default UsernameForm;
