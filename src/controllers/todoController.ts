import { request } from 'http';
import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as todoService from '../services/todoService';

const router = Router();
/**
 * Get list of todos
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/',(req: Request, res: Response, next: NextFunction): void => {
  todoService
    .fetchAll()
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

router.post('/',(req: Request, res: Response, next: NextFunction):void => {
  todoService
    .createTodo(req.param.id,req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;