import * as Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';
import { Request, Response, NextFunction } from 'express';

const SCHEMA = {
  task: Joi.string()
    .label('task')
    .max(90)
    .required(),
  details: Joi.string()
    .label('details')
    .max(90)
    .required(),
  tags: Joi.array()
    .label('tags')
    .required()
};

/**
 * Validate create todo.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
export function todoPostValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch((err: any) => next(err));
}
const PUTSCHEMA = {
  task: Joi.string()
    .label('task')
    .max(90)
    .required(),
  details: Joi.string()
    .label('details')
    .max(90)
    .required()
};
/**
 * Validate update todo
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export function todoPutValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, PUTSCHEMA)
    .then(() => next())
    .catch((err: any) => next(err));
}
