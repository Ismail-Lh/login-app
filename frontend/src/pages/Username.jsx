import Container from '../components/Container';
import FormHeader from '../components/FormHeader';
import UsernameForm from '../components/UsernameForm';

const Username = () => {
	return (
		<Container>
			<FormHeader
				title='Hello Again!'
				subTitle='Explore More by connecting with us.'
			/>

			<UsernameForm />
		</Container>
	);
};

export default Username;
