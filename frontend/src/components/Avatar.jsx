import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';

const Avatar = ({ img = '' }) => {
	return (
		<div className='profile flex justify-center py-4'>
			<img src={img || avatar} className={styles.profile_img} alt='avatar' />
		</div>
	);
};

export default Avatar;
