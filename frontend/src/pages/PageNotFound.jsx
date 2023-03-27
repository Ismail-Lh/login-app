import { Link } from 'react-router-dom';

import styles from '../styles/Username.module.css';

const PageNotFound = () => {
	return (
		<div className='flex justify-center items-center h-screen flex-col'>
			<h1 className='text-6xl mb-2'>404: Not Found</h1>
			<Link
				to='/'
				className={styles.btn}
				style={{ width: '40%', backgroundColor: 'rgb(99 102 241)' }}>
				Go to login page
			</Link>
		</div>
	);
};

export default PageNotFound;
