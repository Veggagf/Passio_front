import { useState } from 'react';

export const useAuthStore = () => {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = (userData) => {
		setUser(userData.user);
		setRole(userData.role);
		setIsAuthenticated(true);
		localStorage.setItem('token', userData.token);
	};

	const logout = () => {
		setUser(null);
		setRole(null);
		setIsAuthenticated(false);
		localStorage.removeItem('token');
	};

	return { user, role, isAuthenticated, login, logout };
};
