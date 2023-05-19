/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../tools/prismaConnection';

export {};

const auth: Router = Router();
const bcrypt = require('bcrypt');
const { requireAuth, validate } = require('../tools/middlewares');

auth.post(
  '/login',
  body('enteredName').isString().notEmpty(),
  body('enteredPassword').isString().notEmpty(),
  validate,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { username: req.body.enteredName }
      });
      const valid: boolean = await bcrypt.compare(
        req.body.enteredPassword,
        user.password
      );
      if (!valid) throw new Error();
      res.json({
        message: 'sucess',
        username: user.username,
        token: user.token,
        id: user.id
      });
    } catch (err) {
      const error = (new Error('auth.unauthorized').message =
        'invalid credentials');
      res.status(401).json({ error });
    }
  }
);

auth.get('/validate', requireAuth, (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'authorized', username: res.locals.username });
});

module.exports = auth;
