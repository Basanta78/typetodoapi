import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';
import { verifyRefreshToken, generateAccessToken } from '../utils/jwt';

const router = Router();

/**
 * Register user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
router.post('/register', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .createUser(req.body)
    .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
    .catch((error: {}) => next(error));
});

/**
 * Login user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .loginUser(req.body)
    .then((data: {}) => res.status(HTTPStatus.CREATED).json({ data  }))
    .catch(err => next(err));
});

/**
 * Delete user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
router.delete('/logout', (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader: string = String(req.headers.authorization);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const refreshToken = bearer[1];
    userService
    .deleteUser(refreshToken)
    .then((data: {}) =>
      res
        .status(HTTPStatus.OK)
        .json({ message: 'Successfully logged out', data })
    )
    .catch((err: any) => next(err));
} else {
  res.sendStatus(400);
}
});

/**
 * Get AccessToken
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
router.get('/refresh', ensureToken, (req: InRequest, res: Response, next: NextFunction): void => {
    try {
      userService.validateRefreshToken(String(req.token));
      const decoded = verifyRefreshToken(String(req.token));
      res.json({accessToken: generateAccessToken(decoded)});

    } catch (err) {
      res.sendStatus(403);
    }
});

interface InRequest extends Request {
  token?: string;
}
/**
 * Get Token
 *
 * @param {IRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function ensureToken(req: InRequest, res: Response, next: NextFunction): void {
  const bearerHeader = String(req.headers.authorization);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

export default router;
