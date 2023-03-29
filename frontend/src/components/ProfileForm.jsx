import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import styles from '../styles/Username.module.css';

import Form from './Form';
import Button from './Button';
import FormFooter from './FormFooter';
import Input from './Input';
import ProfileImageUpload from './ProfileImageUpload';

import { useAuthStore } from '../store';
import { logout } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ProfileForm = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const axiosPrivate = useAxiosPrivate();

	const updateCurrentUser = async userInfo => {
		const { data } = await axiosPrivate.patch(
			'/users/update-current-user',
			userInfo
		);

		return data;
	};

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

			updateUser(values);
		},
	});

	const fields = [
		[
			{ name: 'firstName', type: 'text', placeholder: 'First Name' },
			{
				name: 'lastName',
				type: 'text',
				placeholder: 'Last Name',
			},
		],
		[
			{ name: 'mobile', type: 'text', placeholder: 'Mobile No' },
			{ name: 'email', type: 'text', placeholder: 'Email Address' },
			{ name: 'address', type: 'text', placeholder: 'Address' },
		],
	];

	return (
		<Form onSubmit={formik.handleSubmit}>
			<ProfileImageUpload userImg={user?.profile} />

			<div className={styles.flex_container}>
				<div className='name flex w-3/4 gap-6'>
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

				{/* <button type='button' onClick={() => refresh()}>
					Refresh
				</button> */}
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
