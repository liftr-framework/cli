import { AppRouter } from '@liftr/core'
import { liftrRoute } from '@routes/liftr.route'


export const routes: AppRouter[] = [
  {
    handler: liftrRoute,
    middleware: [],
    path: '/',
  },
];
