import { RequestHandler, Express } from 'express';

declare module 'express' {
  interface Express {
    initialize: () => Promise<Express>;
  }
}
