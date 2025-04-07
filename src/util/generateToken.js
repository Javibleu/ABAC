import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';


const user = {
    id: 1,
    name: 'John Doe',
    role: 'admin',
    department: 'IT',
    accessLevel: 4,
}


const token = jwt.sign(user, env.JWT_SECRET, { expiresIn: "12h"} );