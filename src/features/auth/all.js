const mockDatabase = [
	{
		id: 'canViewProject',
		conditions: [
			{ field: 'role', operator: 'equals', value: 'admin' },
			{ field: 'department', operator: 'equals', value: 'project.department' },
			{ field: 'accessLevel', operator: 'greaterOrEqual', value: 'project.accessLevel' },
			{ field: 'team', operator: 'includes', value: 'user.id' },
		],
	},
	{
		id: 'canUpdateProject',
		conditions: [
			{ field: 'role', operator: 'equals', value: 'manager' },
			{ field: 'department', operator: 'equals', value: 'project.department' },
		],
	},
];

export const evaluatePolicy = (policy, user, resource) => {
	return policy.conditions.every((condition) => {
		const { field, operator, value } = condition;

		// Obtener el valor del campo dinámicamente
		console.log(resource);

		let fieldValue;
		if (field.includes('.')) {
			fieldValue = field.split('.').reduce((obj, key) => obj[key], { user, project: resource });
		} else {
			fieldValue = user[field] || resource[field];
		}

		let resolvedValue;
		if (typeof value === 'string' && value.includes('.')) {
			resolvedValue = value.split('.').reduce((obj, key) => obj[key], { user, project: resource })
		} else {
			resolvedValue = value;
		}

		console.log('field',field, 'value', value, 'field', fieldValue, 'value', resolvedValue);

		switch (operator) {
			case 'equals':
				// console.log('equals', fieldValue, resolvedValue, fieldValue === resolvedValue);
				return fieldValue === resolvedValue;
			case 'greaterOrEqual':
				// console.log('greaterOrEqual', fieldValue, resolvedValue, fieldValue >= resolvedValue);
				return fieldValue >= resolvedValue;
			case 'includes':
				// console.log('includes', fieldValue, resolvedValue, fieldValue.includes(resolvedValue));
				return Array.isArray(fieldValue) && fieldValue.includes(resolvedValue);
			default:
				throw new Error(`Unsupported operator: ${operator}`);
		}
	});
};

export const updatePolicy = async (req, res) => {
	const { policyId, conditions } = req.body;

	try {
		await savePolicyToDatabase(policyId, conditions);
		res.status(200).json({ message: 'Policy updated successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error updating policy', error });
	}
};

/**
 *
 * @param {string} policyId
 * @param {Object} user
 * @param {Object} project
 * @returns
 */
export const canPerformAction = async (policyId, user, project) => {
	const policy = await getPolicyFromDatabase(policyId); // Cargar política desde la DB
	if (!policy) throw new Error(`Policy ${policyId} not found`);
	return evaluatePolicy(policy, user, project);
};

export const getPolicyFromDatabase = async (policyId) => {
	// Simula una consulta a la base de datos
	const policy = mockDatabase.find((policy) => policy.id === policyId);
	return policy || null; // Devuelve la política o null si no se encuentra
};
