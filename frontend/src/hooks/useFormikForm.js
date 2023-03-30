import { useFormik } from 'formik';
import { validateFields } from '../helpers/validate';

const useFormikForm = ({ initialValues, onSubmit }) => {
	const formik = useFormik({
		initialValues,
		validate: validateFields,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit,
	});

	return formik;
};

export default useFormikForm;
