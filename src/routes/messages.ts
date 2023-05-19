/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import prisma from '../tools/prismaConnection';

const { requireAuth, validate } = require('../tools/middlewares');

export {};

const messages: Router = Router();

messages.get(
  '/history',
  requireAuth,
  body('skip').isNumeric(),
  body('channelId').isString().notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    const messages = await prisma.message.findMany({
      where: { channelId: req.body.channelId },
      orderBy: { createdAt: 'desc' },
      skip: 50 * req.body.skip,
      take: 50
    });
    res.json(messages);
  }
);

module.exports = messages;
