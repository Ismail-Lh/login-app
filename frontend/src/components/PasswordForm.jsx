import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import Form from './Form';

import { login } from '../lib/apiRequest';
import { useAuthStore } from '../store';
import { passwordFields } from '../inputsData';
import useFormikForm from '../hooks/useFormikForm';

const initialValues = { password: '' };

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

	const onSubmit = values => loginUser({ username, password: values.password });

	const formik = useFormikForm({ initialValues, onSubmit });

	// TODO: Add the password show icon functionality

	return (
		<Form
			onSubmit={formik.handleSubmit}
			formik={formik}
			isLoading={isLoading}
			btnLoadingText='Sign In Loading...'
			btnText='Sign In'
			avatar={true}
			avatarImg={user?.profile}
			fields={passwordFields}
			footerText='Forgot Password'
			footerLinkText='Recover Now'
			footerRoute='/recovery'
			checkBox={true}
		/>
	);
};

export default PasswordForm;
