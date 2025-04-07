import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const verifyTokenOrig = (req, res, next) => {
	let authHeader = req.headers.authorization; // Extract token from Authorization header
	let token;

	if (authHeader && authHeader.startsWith('Bearer ')) {
		token = authHeader.split(' ')[1]; // Extract token from the header
	}

	if (!token) {
		return res.status(403).json({ message: 'No token provided!' });
	}

	try {
		jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: 'Unauthorized!' });
			}
			req.user = decoded;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: 'Error processing token' });
	}
};

export const verifyToken = (req, res, next) => {
    const { id, name, role, department, accessLevel } = req.body;
    req.user = {id, name, role, department, accessLevel};
    next();
}
