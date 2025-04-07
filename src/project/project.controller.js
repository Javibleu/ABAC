import { canPerformAction } from '../features/auth/all.js';
import { projects } from './project.db.js';


// Standard response function
const standardResponse = (res, status, message, project = null) => {
	res.status(status).json({
		status,
		message,
		project,
	});
};

export const getProjectById = async (req, res) => {
	const projectId = parseInt(req.params.id, 10);
	const project = projects.find((project) => project.id === projectId);

	if (!project) return res.status(404).json({ message: 'Project not found' });
  
  // Using higher-order function
	//  const handleAuthorized = () => res.status(200).json({ message: 'Project found', project });
	//	authorize(canViewProject, project)(req, res, handleAuthorized);

  // Using Authorizer class
	// const authorizer = new Authorizer(canViewProject, project);
	// authorizer.check(req, res, () => {
	// 	res.status(200).json({ message: 'Project found', project });
	// });

  // Using Authorizerb class
  // const authorizerb = new Authorizerb();
  // const isAuthorized = authorizerb.checkb(canViewProject, req.user, project);

  // if(isAuthorized) return res.status(200).json({ message: 'Project found', project });
  // return res.status(403).json({ message: 'Forbidden' });

  // Using dinamic Authorization
  const isAuthorized = await canPerformAction('canViewProject', req.user, project);
  if (isAuthorized) return res.status(200).json({ message: 'Project found', project });
  return res.status(403).json({ message: 'Forbidden' });
};

export const updateProject = async (req, res) => {
	res.json({ message: 'updateProject' });
};
