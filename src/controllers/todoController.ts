import { Request, Response } from 'express';
import todoModel from '../models/todoModel';
import type { CreateTodoRequest } from '../types/todo';
import { sendSuccess, sendSuccessPagination, sendError } from '../utils/response';

// 1. Get All Todos dengan Implementasi Pagination
export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      sendError(res, 'User tidak terautentikasi!', 401);
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const offset = (page - 1) * perPage;

    const todos = await todoModel.getByUserId(userId, perPage, offset);
    const total = await todoModel.countByUserId(userId);
    const totalPages = Math.ceil(total / perPage);

    sendSuccessPagination({
      res,
      message: 'Berhasil mengambil data todo.',
      data: todos,
      pagination: { page, perPage, total, totalPages }
    });
  } catch (error) {
    sendError(res, 'Gagal mengambil data todo.', 500);
  }
};

// 2. Create Todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const payload: CreateTodoRequest = req.body;
  try {
    const userID = req.user?.id;
    if (!userID) {
      sendError(res, 'User tidak terautentikasi!', 401);
      return;
    }

    await (todoModel as any).create(payload.task, userID);

    sendSuccess(res, 'Todo berhasil ditambahkan!', undefined, 201);
  } catch (error) {
    sendError(res, 'Gagal menambahkan todo.', 500);
  }
};
