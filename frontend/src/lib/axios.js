import axios from 'axios';

const URL = import.meta.env.VITE_URL_BASE;

export default axios.create({
	baseURL: URL,
});

export const axiosPrivate = axios.create({
	baseURL: URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
