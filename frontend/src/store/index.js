import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
	auth: {
		username: '',
		user: {},
		token: null,
	},
};

export const useAuthStore = create(
	persist(
		set => ({
			...initialState,
			setUsername: name =>
				set(state => ({ auth: { ...state.auth, username: name } })),
			setUser: userInfo =>
				set(state => ({ auth: { ...state.auth, user: userInfo } })),
			setToken: token => set(state => ({ auth: { ...state.auth, token } })),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
