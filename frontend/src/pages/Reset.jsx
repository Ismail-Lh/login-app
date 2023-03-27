import Container from '../components/Container';
import ResetForm from '../components/ResetForm';
import FormHeader from '../components/FormHeader';

const Reset = () => {
	return (
		<Container
			style={{
				width: '50%',
				height: '80%',
				display: 'grid',
				alignItems: 'center',
			}}>
			<FormHeader title='Reset Password' subTitle='Enter new password.' />
			<ResetForm />
		</Container>
	);
};

export default Reset;
