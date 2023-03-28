import { create } from 'zustand';

export const useAuthStore = create(set => ({
	auth: {
		username: '',
		user: {},
		profileImg: null,
		accessToken: null,
	},
	setUsername: name =>
		set(state => ({ auth: { ...state.auth, username: name } })),
	setUser: userInfo =>
		set(state => ({ auth: { ...state.auth, user: userInfo } })),
	setProfileImg: img =>
		set(state => ({ auth: { ...state.auth, profileImg: img } })),
	setAccessToken: token =>
		set(state => ({ auth: { ...state.auth, accessToken: token } })),
}));
