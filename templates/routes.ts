import { Router } from 'express';
import { ScaffoldRoute } from '@routes/scaffold.route'

interface AppRouter {
  path: string;
  middleware: any[];
  handler: Router;
}

export const routes: AppRouter[] = [
  {
    handler: ScaffoldRoute,
    middleware: [],
    path: '/',
  },
];
