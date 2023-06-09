/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, Router } from 'express';

const { requireAuth, validate } = require('../tools/middlewares');

export {};

const upload: Router = Router();

upload.post(
  '/file',
  requireAuth,
  validate,
  async (req: Request, res: Response) => {
    res.status(404).json({ msg: 'to be added' });
  }
);

module.exports = upload;
