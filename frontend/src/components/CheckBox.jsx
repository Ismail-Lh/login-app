import React from 'react';

import { usePersistStore } from '../store';

const CheckBox = () => {
	const { persistLogin, setPersistLogin } = usePersistStore(state => state);

	const togglePersist = () => {
		setPersistLogin();
	};

	return (
		<div>
			<input
				type='checkbox'
				name='persistLogin'
				id='persistLogin'
				onChange={togglePersist}
				checked={persistLogin}
			/>
			<label htmlFor='persistLogin'>Trust this device!</label>
		</div>
	);
};

export default CheckBox;
