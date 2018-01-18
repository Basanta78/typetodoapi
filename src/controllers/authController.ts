import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';

let router = Router();

/**
 * Register user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
router.post('/register',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .createUser(req.body)
    .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
    .catch((error: {}) => next(error));
});

router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .loginUser(req.body)
    .then((data:{}) =>res.status(HTTPStatus.CREATED).json({ data  }))
    .catch(err => next(err));
});

router.delete('/logout', (req: Request, res: Response, next: NextFunction): void=> {
  const bearerHeader: string = String(req.headers['authorization']);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const refreshToken = bearer[1];
  // let authorizationString  = String(req.headers.authorization.substring(7));
  userService
    .deleteUser(refreshToken)
    .then(data =>
      res
        .status(HTTPStatus.OK)
        .json({ message: 'Successfully logged out', data })
    )
    .catch(err => next(err))
}
else {
  res.sendStatus(400);
}
});

export default router;
