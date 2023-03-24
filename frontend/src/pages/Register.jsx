import RegisterForm from '../components/RegisterForm';
import FormHeader from '../components/FormHeader';
import Container from '../components/Container';

const Register = () => {
	return (
		<Container style={{ width: '100%' }}>
			<FormHeader title='Register' subTitle='Happy to join you!' />

			<RegisterForm />
		</Container>
	);
};

export default Register;
