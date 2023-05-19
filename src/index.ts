import { Request, Response, Express } from 'express';
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app: Express = express();

const auth = require('./routes/auth');
const upload = require('./routes/upload');

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Grungus API');
});

app.use('/auth', auth);
app.use('/upload', upload);

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`express server is running on port ${process.env.PORT ?? 4000}`);
});
