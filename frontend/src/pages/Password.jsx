import { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import { useAuthStore } from '../store';
import PasswordForm from '../components/PasswordForm';

const Password = () => {
	const { user } = useAuthStore(state => state.auth);

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>
							Hello {user?.firstName || user?.username}!
						</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Explore More by connecting with us.
						</span>
					</div>

					<PasswordForm />
				</div>
			</div>
		</div>
	);
};

export default Password;
