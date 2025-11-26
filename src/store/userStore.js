import { useState } from 'react';

export const useUserStore = () => {
	const [users, setUsers] = useState([]);

	const setAllUsers = (userList) => setUsers(userList);
	const addUser = (user) => setUsers((prev) => [...prev, user]);
	const updateUser = (id, updatedUser) => setUsers((prev) => prev.map(u => u.id === id ? updatedUser : u));
	const deleteUser = (id) => setUsers((prev) => prev.filter(u => u.id !== id));

	return { users, setAllUsers, addUser, updateUser, deleteUser };
};
