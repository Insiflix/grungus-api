/* eslint-disable @typescript-eslint/no-base-to-string */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../tools/prismaConnection';

const cache = require('memory-cache');
export {};

const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.query?.token === undefined) {
      throw new Error();
    }
    const userCached = cache.get(req.query.watchToken);
    if (userCached !== null) {
      res.locals.userName = userCached.user_name;
      next();
    }
    const user = await prisma.user.findFirstOrThrow({
      where: { token: req.query.token.toString() },
      select: { username: true }
    });
    res.locals.userName = user.username;
    cache.put(req.query.watchToken, user.username, 3600 * 1000);
    next();
  } catch (err) {
    const error = (new Error('auth.unauthorized').message =
      'Missing watchToken');
    res.status(401).json(error);
  }
};

const validate = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = { requireAuth, validate };
