import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';

import { convertToBase64 } from '../helpers/convert';
import { useAuthStore } from '../store';

const ProfileImageUpload = ({ userImg }) => {
	const {
		setProfileImg,
		auth: { profileImg },
	} = useAuthStore(state => state);

	const handleUpload = async e => {
		const base64 = await convertToBase64(e.target.files[0]);
		setProfileImg(base64);
	};

	return (
		<div className='profile flex justify-center pb-4'>
			<label htmlFor='profile'>
				<img
					src={userImg || profileImg || avatar}
					className={styles.profile_img}
					alt='avatar'
				/>
			</label>

			<input
				type='file'
				name='profile'
				id='profile'
				accept='image/*'
				onChange={handleUpload}
			/>
		</div>
	);
};

export default ProfileImageUpload;
