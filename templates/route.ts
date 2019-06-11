import { Router, Request, Response, NextFunction} from "express"
import { liftrController } from "@controllers/liftr.controller"

export const liftrRoute: Router = Router()
  .get('/', liftrController);
