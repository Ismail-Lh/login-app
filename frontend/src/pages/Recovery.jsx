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
			return toast.error('Wrong OTP! Check email again!');
		}
	};

	const resendOtp = () => {
		let sentPromise = generateOtp(username);

		toast.promise(sentPromise, {
			loading: 'Sending...',
			success: <b>OTP has been send to your email!</b>,
			error: <b>Could not Send it!</b>,
		});
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
							<button type='submit' className={styles.btn} disabled={isLoading}>
								{isLoading ? 'Generating OTP...' : 'Recover'}
							</button>
						</div>
					</form>
					<div className='text-center py-4'>
						<span className='text-gray-500'>
							Can't get OTP?
							<button
								className='text-red-500 mx-4'
								onClick={() => resendOtp()}
								type='button'>
								Resend
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recovery;
