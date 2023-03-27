const FormHeader = ({ title, subTitle }) => {
	return (
		<div className='title flex flex-col items-center'>
			<h4 className='text-5xl font-bold'>{title}</h4>
			<span className='py-2 text-xl w-2/3 text-center text-gray-500'>
				{subTitle}
			</span>
		</div>
	);
};

export default FormHeader;
