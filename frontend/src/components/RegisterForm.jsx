import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

import Form from './Form';
import FormFooter from './FormFooter';
import Input from './Input';
import Button from './Button';
import ProfileImageUpload from './ProfileImageUpload';

import { registerUser } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import { useAuthStore } from '../store';

const RegisterForm = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { profileImg } = useAuthStore(state => state.auth);

	const { mutate: createNewUser, isLoading } = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['users'], { exact: true });
			navigate('/');
		},
		onError: error => {
			toast.error(error?.response.data.message);
		},
	});

	const formik = useFormik({
		initialValues: {
			userName: '',
			email: '',
			password: '',
		},
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async values => {
			values = Object.assign(values, { profile: profileImg || '' });

			createNewUser(values);
		},
	});

	const fields = [
		{ name: 'email', type: 'email', placeholder: 'Enter your email address' },
		{ name: 'userName', type: 'text', placeholder: 'Enter your username' },
		{ name: 'password', type: 'password', placeholder: 'Enter your password' },
	];

	return (
		<Form onSubmit={formik.handleSubmit}>
			<ProfileImageUpload />

			<div className='textbox flex flex-col items-center gap-6'>
				{fields.map(({ type, name, placeholder }) => (
					<Input
						key={name}
						type={type}
						name={name}
						placeholder={placeholder}
						formik={formik}
					/>
				))}

				<Button
					isLoading={isLoading}
					loadingText='Registering user...'
					text='Register'
				/>
			</div>

			<FormFooter text='Already Register?' linkText='Login now!' route='/' />
		</Form>
	);
};

export default RegisterForm;
