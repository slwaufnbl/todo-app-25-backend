import pool from '../config/db';

export const todoModel = {
  getByUserId: async (userId: number, limit: number, offset: number) => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );
    return rows;
  },

  countByUserId: async (userId: number) => {
    const [rows]: any = await pool.query(
      'SELECT COUNT(*) AS total FROM todos WHERE user_id = ?',
      [userId]
    );
    return rows[0].total as number;
  }
};

export default todoModel;
