import { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';

const Container = ({ children, style }) => {
	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass} style={style}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Container;
