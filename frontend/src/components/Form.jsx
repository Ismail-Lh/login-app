import styles from '../styles/Username.module.css';

import Avatar from './Avatar';
import Button from './Button';
import CheckBox from './CheckBox';
import FormFooter from './FormFooter';
import Input from './Input';
import ProfileImageUpload from './ProfileImageUpload';

const Form = ({
	children,
	onSubmit,
	fields,
	isLoading,
	btnLoadingText,
	btnText,
	avatar,
	avatarImg,
	formik,
	footerText,
	footerLinkText,
	footerRoute,
	footerBtnText,
	onClick,
	checkBox,
	userImg,
	flexContainer,
	recovery,
}) => {
	return (
		<form className='py-1' onSubmit={onSubmit}>
			{recovery ? (
				children
			) : (
				<>
					{avatar ? (
						<Avatar img={avatarImg} />
					) : (
						<ProfileImageUpload userImg={userImg} />
					)}

					<div
						className={
							!flexContainer
								? 'flex flex-col items-center gap-6'
								: styles.flex_container
						}>
						{fields[1] ? (
							<>
								<div className='flex w-3/4 gap-6'>
									{fields[1].map(({ type, name, placeholder }) => (
										<Input
											key={name}
											type={type}
											name={name}
											placeholder={placeholder}
											formik={formik}
										/>
									))}
								</div>
								{fields[0].map(({ type, name, placeholder }) => (
									<Input
										key={name}
										type={type}
										name={name}
										placeholder={placeholder}
										formik={formik}
									/>
								))}
							</>
						) : (
							<>
								{fields[0].map(({ type, name, placeholder }) => (
									<Input
										key={name}
										type={type}
										name={name}
										placeholder={placeholder}
										formik={formik}
									/>
								))}
							</>
						)}

						<Button
							isLoading={isLoading}
							loadingText={btnLoadingText}
							text={btnText}
						/>

						{checkBox ? <CheckBox /> : null}
					</div>

					<FormFooter
						text={footerText}
						linkText={footerLinkText}
						route={footerRoute}
						btnText={footerBtnText}
						onClick={onClick}
					/>
				</>
			)}
		</form>
	);
};

export default Form;
