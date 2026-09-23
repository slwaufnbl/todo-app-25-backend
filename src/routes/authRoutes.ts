import { Router } from 'express';
import { register, login } from '../controllers/authControllers';
import { validateRegister, validateLogin } from '../middlewares/validator';

const router = Router();

// Rute untuk Register dan Login dengan validasi
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
