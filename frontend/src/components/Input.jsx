import React from 'react';

import styles from '../styles/Username.module.css';

const Input = ({ type = 'text', placeholder, formik, name }) => {
	return (
		<input
			className={styles.textbox}
			type={type}
			name={name}
			placeholder={placeholder}
			{...formik.getFieldProps(name)}
		/>
	);
};

export default Input;
