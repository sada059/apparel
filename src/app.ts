import express, { Express } from 'express';
import bodyParser from 'body-parser';
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
  }
app.initialize = initialize;
export default app;