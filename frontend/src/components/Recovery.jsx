import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { generateOtp, verifyOtp } from '../lib/apiRequest';
import { useAuthStore } from '../store';
import styles from '../styles/Username.module.css';

const Recovery = () => {
	const { username } = useAuthStore(state => state.auth);

	const navigate = useNavigate();

	const [code, setCode] = useState();

	const { data: otpCode } = useQuery({
		queryKey: ['OTP'],
		queryFn: () => generateOtp(username),
		onSuccess: () => {
			toast.success(<b>OTP has been send to your email address.</b>);
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const verifyOtpQuery = useQuery({
		queryKey: ['OTP'],
		queryFn: verifyOtp,
		onSuccess: () => {
			toast.success(<b>OTP verify successfully!</b>);
			navigate('/reset');
		},
		onError: error => {
			toast.error(<b>{error?.response.data.message}</b>);
		},
	});

	const handleSubmit = e => {
		e.preventDefault();

		verifyOtpQuery.query({ username, otpCode: code });
	};

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Recovery!</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Enter the OTP to recover your password.
						</span>
					</div>

					<form className='pt-20' onSubmit={handleSubmit}>
						<div className='textbox flex flex-col items-center gap-6'>
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
							<button type='submit' className={styles.btn}>
								Sign In
							</button>
						</div>

						<div className='text-center py-4'>
							<span className='text-gray-500'>
								Can't get OTP?
								<button className='text-red-500 mx-4'>Resend</button>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Recovery;
