import React from 'react';

import styles from '../styles/Username.module.css';

const Input = (value, type = 'text', placeholder, handleChange) => {
	console.log(value);

	return (
		<input
			className={styles.textbox}
			value={value.value}
			type={type}
			onChange={handleChange}
			placeholder={placeholder}
		/>
	);
};

export default Input;
