import express, { Express } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import { sync } from 'glob';
import path from 'path';
import apparelRoutes from './routes/v1/user/apparel';
import orderRoutes from './routes/v1/user/order';


interface CustomExpress extends Express {
    initialize?: () => Promise<Express>;
  }

const app: CustomExpress = express();

app.use(bodyParser.json());

async function initialize(): Promise<Express> {
    await setupAndloadUserRoutes();
    return app;
  }
  
  async function setupAndloadUserRoutes() {
    app.use('/apparel', apparelRoutes);
    app.use('/order', orderRoutes);

    // sync("./routes/v1/user/*.ts").forEach(function (file) {
    //   app.use(`/${config.get("api.version")}`, require(path.resolve(file)));
    // });
  }
app.initialize = initialize;
export default app;