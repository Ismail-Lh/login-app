import Mailgen from 'mailgen';

export const generateEmail = new Mailgen({
	theme: 'default',
	product: {
		// Appears in header & footer of e-mails
		name: 'Mailgen',
		link: 'https://mailgen.js/',
		logo: 'https://mailgen.js/img/logo.png',
	},
});
