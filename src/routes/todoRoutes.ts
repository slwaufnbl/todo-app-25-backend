import { Router } from 'express';
import { getAllTodos, createTodo } from '../controllers/todoController';
import { verifyToken } from '../middlewares/authMiddleware';
import { validateCreateTodo } from '../middlewares/validator';

const router = Router();

router.use(verifyToken);
router.get('/', getAllTodos);
router.post('/', validateCreateTodo, createTodo);

export default router;
