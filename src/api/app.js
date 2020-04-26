import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import 'express-async-errors';

import config from './config';
import exceptions from './middlewares/exceptions';
import unknownRoute from './middlewares/unknown-route';
import noCacheControl from './middlewares/no-cache-control';

import orders from './orders/order.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(noCacheControl);

app.use('/orders', orders);

app.use(unknownRoute);
app.use(exceptions(config.debug));

export default app;
