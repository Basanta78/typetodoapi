import { Router } from 'express';
import * as homeController from './controllers/homeController';
import  usersController  from './controllers/userController';
import authController from './controllers/authController';
import { uniqueEmail, userExists } from './validators/userValidator';

let router = Router();
router.get('/', homeController.index);
router.use('/users', usersController);
router.use('/', authController);

export default router;
