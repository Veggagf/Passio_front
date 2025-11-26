import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(persist((set) => ({
	user: null,
	role: null,
	token: null,
	isAuthenticated: false,
	login: (payload) => {
		const { user, role, token } = payload;
		set({ user, role, token, isAuthenticated: true });
		if (token) localStorage.setItem('token', token);
		if (role) localStorage.setItem('role', role);
	},
	logout: () => {
		set({ user: null, role: null, token: null, isAuthenticated: false });
		localStorage.removeItem('token');
		localStorage.removeItem('role');
	},
}), { name: 'auth-storage' }));
