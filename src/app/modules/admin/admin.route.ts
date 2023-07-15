import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post('/create-admin', AdminController.createAdmin);

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.patch('/:id', AdminController.updateAdmin);
router.get('/', AdminController.getAllAdmins);



export const AdminRoutes = router;
