export const canViewProject = (user, project) => {
	const role = user.role === 'admin';
	const department = user.department === project.department;
	const accessLevel = user.accessLevel >= project.accessLevel;
	const team = project.team.includes(user.id);

	return role && department && accessLevel && team;
};

export const canUpdateProject = (user, project) => {
	const role = user.role === 'admin' || user.role === 'manager';
	const department = user.department === project.department;
	const accessLevel = user.accessLevel >= project.accessLevel;
	const team = project.team.includes(user.id);

	return role && department && accessLevel && team;
};
