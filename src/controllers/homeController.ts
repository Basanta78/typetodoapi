import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status-codes';
import * as homeService from '../services/homeService';

export function index(req: Request, res: Response): void {
  const result = homeService.getAppInfo();
  res.status(HTTPStatus.OK).json(result);
}
