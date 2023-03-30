import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const usePersistStore = create(
	persist(
		(set, get) => ({
			persistLogin: false,
			setPersistLogin: () => set({ persistLogin: !get().persistLogin }),
		}),
		{
			name: 'persist-login', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);
