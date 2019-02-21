import { Router } from 'express';
import { LiftrRoute } from '@routes/liftr.route'

interface AppRouter {
  path: string;
  middleware: any[];
  handler: Router;
}

export const routes: AppRouter[] = [
  {
    handler: LiftrRoute,
    middleware: [],
    path: '/',
  },
];
