import { adminRoutes } from './routes';
import { Router } from 'express';

const AdminModule = Router();

AdminModule.use('/admin', adminRoutes);

export { AdminModule };
