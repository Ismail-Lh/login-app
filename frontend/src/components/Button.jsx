import styles from '../styles/Username.module.css';

const Button = ({ isLoading, type = 'submit', loadingText, text }) => {
	return (
		<button type={type} className={styles.btn} disabled={isLoading}>
			{isLoading ? loadingText : text}
		</button>
	);
};

export default Button;
