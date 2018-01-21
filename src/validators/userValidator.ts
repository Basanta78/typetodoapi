import * as Joi from 'joi';
import * as Boom from 'boom';
import lang from '../utils/lang';
import validate from '../utils/validate';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';

/**
 * Validate user existence.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export function userExists(req: Request, res: Response, next: NextFunction) {
  return userService
    .findById(req.params.id)
    .then(() => next())
    .catch(() => next(Boom.notFound(lang.userNotFound)));
}

const LOGINSCHEMA = {
  email: Joi.string()
    .label('Email')
    .max(90)
    .required(),
  password: Joi.string()
    .label('Password')
    .max(90)
    .required()
};
/**
 * Validate login user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
export function userLoginValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, LOGINSCHEMA)
    .then(() => next())
    .catch((err: any) => next(err));
}
const REGISTERSCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required(),
  email: Joi.string()
    .label('Email')
    .max(90)
    .required(),
  password: Joi.string()
    .label('Password')
    .max(90)
    .required()
};
/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
export function userRegisterValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, REGISTERSCHEMA)
    .then(() => next())
    .catch((err: any) => next(err));
}
