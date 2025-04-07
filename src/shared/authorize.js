/**
 * Middleware to authorize a user based on a policy function and resource.
 * @param {Function} policy - The policy function to check authorization.
 * @param {Object} resource - The resource to check against the policy.
 * @returns {Function} Middleware function that checks authorization.
 */
export const authorize = (policy, resource) => {
	return (req, res, next) => {
		const user = req.user;
		if (policy(user, resource)) {
			return next(); // User is authorized, proceed to the next middleware
		}
		return res.status(403).json({ message: 'Forbidden' });
	};
};



export class Authorizer {
    constructor(policy, resource) {
        this.policy = policy;
        this.resource = resource;
    }

    check(req, res, next) {
        const user = req.user;
        if (this.policy(user, this.resource)) {
            return next(); // User is authorized
        }
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export class Authorizerb {
    checkb(policy, user, resource) {
        if (policy(user, resource)) {
            return true; // User is authorized
        }
        return false; // User is not authorized
    }
}
