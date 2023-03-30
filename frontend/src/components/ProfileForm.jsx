import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import Form from './Form';

import { useAuthStore } from '../store';
import { logout } from '../lib/apiRequest';
import { validateFields } from '../helpers/validate';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { profileFields } from '../inputsData';

const ProfileForm = () => {
	const navigate = useNavigate();
	const location = useLocation();

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

	const {
		mutate: updateUser,
		isLoading,
		error,
	} = useMutation({
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

	if (error?.response.status === 403)
		return <Navigate to='/' state={{ from: location }} replace />;

	return (
		<Form
			onSubmit={formik.handleSubmit}
			formik={formik}
			isLoading={isLoading}
			btnLoadingText='Updating User...'
			btnText='Update'
			avatar={false}
			fields={profileFields}
			footerText='Come back later.'
			footerBtnText='Logout!'
			onClick={logoutUser}
			userImg={user?.profile}
			flexContainer={true}
		/>
	);
};

export default ProfileForm;
