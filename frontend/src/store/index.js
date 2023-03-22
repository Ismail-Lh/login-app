import { create } from 'zustand';

export const useAuthStore = create(set => ({
	auth: {
		username: '',
		user: {},
		token: null,
	},
	setUsername: name =>
		set(state => ({ auth: { ...state.auth, username: name } })),
	setUser: userInfo =>
		set(state => ({ auth: { ...state.auth, user: userInfo } })),
	setToken: token => set(state => ({ auth: { ...state.auth, token } })),
}));
