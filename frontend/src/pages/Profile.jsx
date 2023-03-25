import Container from '../components/Container';
import ProfileForm from '../components/ProfileForm';
import FormHeader from '../components/FormHeader';

const Profile = () => {
	return (
		<Container style={{ width: '50%' }}>
			<FormHeader
				title='Profile'
				subTitle='You can update your profile details.'
			/>
			<ProfileForm />
		</Container>
	);
};

export default Profile;
