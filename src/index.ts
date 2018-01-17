import * as cors from 'cors';
import routes from './routes';
import * as express from 'express';
import config from './config/config';
import * as bodyParser from 'body-parser';
import * as errorHandler from './middlewares/errorHandler';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(config.app.port, config.app.host, () => {
  console.log(`Listening on http://${config.app.host}:${config.app.port}/api`);
});

export default app;
