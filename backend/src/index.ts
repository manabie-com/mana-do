import http from 'http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'

import cors from '@koa/cors'

import * as config from './configs'
import logger from './logger'
import router from './routes'

class Server {
  private app: Koa;
  private server: http.Server;

  constructor() {
    this.start();
  }

  private async start(): Promise<void> {
    this.app = new Koa();
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser({ formLimit: '5mb' }));
    this.app.use(router());
    this.server = http.createServer(this.app.callback());
    this.server.listen(config.PORT);
    logger.info(`Environment: ${config.NODE_ENV}`);
    logger.info(`App listening on port: ${config.PORT}`);
  }
}

export default new Server();
