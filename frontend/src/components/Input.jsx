import { useEffect, useRef } from 'react';

import styles from '../styles/Username.module.css';

const Input = ({ type = 'text', placeholder, formik, name }) => {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<input
			className={styles.textbox}
			ref={inputRef}
			type={type}
			name={name}
			placeholder={placeholder}
			{...formik.getFieldProps(name)}
		/>
	);
};

export default Input;
