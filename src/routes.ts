import { Router } from 'express';
import * as homeController from './controllers/homeController';
import  usersController  from './controllers/userController';
import * as authController from './controllers/authController';
import { uniqueEmail, userExists } from './validators/userValidator';

let router = Router();
router.get('/', homeController.index);

router.post('/register', authController.register);

router.use('/users', usersController);

export default router;
