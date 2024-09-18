// admin.routes.ts
import { Router } from 'express';
import { AdminController } from '../controllers';


export const router = Router();


// Route to get statistics
router.get('/statistics', AdminController.getStatistics);

// Route to get recent loans
router.get('/recent', AdminController.getRecentLoans);


