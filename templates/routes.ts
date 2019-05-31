import { AppRouter } from '@liftr/core'
import { LiftrRoute } from '@routes/liftr.route'


export const routes: AppRouter[] = [
  {
    handler: LiftrRoute,
    middleware: [],
    path: '/',
  },
];
