import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '../store';
import { generateOtp, verifyOtp } from '../lib/apiRequest';

import styles from '../styles/Username.module.css';

import Button from './Button';
import Form from './Form';

const RecoveryForm = () => {
	const navigate = useNavigate();
	const [code, setCode] = useState();

	const { username } = useAuthStore(state => state.auth);

	const { isLoading } = useQuery({
		queryKey: ['OTP', username],
		queryFn: () => generateOtp(username),
		onSuccess: () => {
			toast.success(<b>OTP has been send to your email address.</b>);
		},
		onError: error => {
			toast.error(<b>{error?.response?.data?.message}</b>);
		},
		refetchOnWindowFocus: false,
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			let { status, data } = await verifyOtp({ username, otpCode: code });

			if (status === 201) {
				navigate('/reset');
				toast.success(data?.message);
			}
		} catch (error) {
			console.log(error);

			return toast.error('Wrong OTP! Check email again!');
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div className={styles.flex_container}>
				<div className='input text-center'>
					<span className='py-4 text-sm text-left text-gray-500'>
						Enter the 6 digit OTP sent to your email address.
					</span>
					<input
						className={styles.textbox}
						type='text'
						placeholder='Enter your OTP'
						onChange={e => setCode(e.target.value)}
					/>
				</div>

				<Button
					isLoading={isLoading}
					loadingText='Generating OTP...'
					text='Recover'
				/>
			</div>
		</Form>
	);
};

export default RecoveryForm;
