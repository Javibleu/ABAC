import { Router } from 'express';
import { getProjectById, updateProject } from './project.controller.js';
import { verifyToken } from '../shared/authentication.js';


const projectRoutes = Router();

// Route to view a project
projectRoutes.get('/:id', verifyToken, getProjectById);

// Route to update a project
projectRoutes.put('/:id', verifyToken, updateProject);


export default projectRoutes;