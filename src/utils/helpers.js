import { ROLES } from './constants';

export const hasPermission = (userRole, allowedRoles) => {
	return allowedRoles.includes(userRole);
};

export const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};
