import { create } from 'zustand';

const initialState = {
	username: '',
	user: {},
	profileImg: null,
	accessToken: null,
};

export const useAuthStore = create(set => ({
	auth: initialState,
	setUsername: name =>
		set(state => ({ auth: { ...state.auth, username: name } })),
	setUser: userInfo =>
		set(state => ({ auth: { ...state.auth, user: userInfo } })),
	setProfileImg: img =>
		set(state => ({ auth: { ...state.auth, profileImg: img } })),
	setAccessToken: token =>
		set(state => ({ auth: { ...state.auth, accessToken: token } })),
	clearAuthState: () => ({ auth: { ...initialState } }),
}));
