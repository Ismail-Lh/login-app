import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import Button from './Button';
import FormFooter from './FormFooter';
import Input from './Input';
import ProfileImageUpload from './ProfileImageUpload';

import { useAuthStore } from '../store';
import { logout, updateCurrentUser } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import Form from './Form';

const ProfileForm = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const {
		auth: { user, profileImg },
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
			values = Object.assign(values, {
				profile: profileImg || user?.profile || '',
			});

			const token = localStorage.getItem('token');

			updateUser({ values, token });
		},
	});

	const fields = [
		[
			{ name: 'firstName', type: 'text', placeholder: 'Enter your firstName.' },
			{
				name: 'lastName',
				type: 'text',
				placeholder: 'Enter your lastName.',
			},
		],
		[
			{ name: 'mobile', type: 'text', placeholder: 'Enter your mobile No.' },
			{ name: 'email', type: 'text', placeholder: 'Enter your email address.' },
			{ name: 'address', type: 'text', placeholder: 'Enter your address.' },
		],
	];

	return (
		<Form onSubmit={formik.handleSubmit}>
			<ProfileImageUpload userImg={user?.profile} />

			<div className='textbox flex flex-col items-center gap-6'>
				<div className='name flex w-3/4 gap-10'>
					{fields[0].map(({ type, name, placeholder }) => (
						<Input
							key={name}
							type={type}
							name={name}
							placeholder={placeholder}
							formik={formik}
						/>
					))}
				</div>

				{fields[1].map(({ type, name, placeholder }) => (
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
					loadingText='Updating user...'
					text='Update'
				/>
			</div>

			<FormFooter
				text='Come back later.'
				btnText='Logout!'
				onClick={logoutUser}
			/>
		</Form>
	);
};

export default ProfileForm;
