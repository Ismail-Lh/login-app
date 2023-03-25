const Form = ({ children, onSubmit }) => {
	return (
		<form className='py-1' onSubmit={onSubmit}>
			{children}
		</form>
	);
};

export default Form;
