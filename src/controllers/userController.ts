import { request } from 'http';
import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import todoController from './todoController';
import * as todoService from '../services/todoService';

const router = Router();
// router.use('/todo', todoController)
/**
 * Get list of user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .fetchAll()
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

/**
 * Get specific user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/:id',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .findById(req.params.id)
    .then((result = {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

/**
 * Update specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.put('/:id',(req: Request, res: Response, next: NextFunction): void => {
  req.body.id = req.params.id;
  userService
    .update(req.params.id,req.body)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

/**
 * Delete specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.delete('/:id',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .removeUserById(req.params.id)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

router.post('/:id/todo',(req: Request, res: Response, next: NextFunction):void => {
  todoService
    .createTodo(req.params.id,req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
export default router;
