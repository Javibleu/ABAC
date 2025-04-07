import express from 'express';
import { env } from './config/env.js';
import projectRoutes from './project/project.routes.js';
import { getPolicyFromDatabase } from './features/auth/all.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// Routes
app.use('/api/projects', projectRoutes);

// Error handling middleware


// App listening

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
});