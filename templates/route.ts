import { Router, Request, Response, NextFunction} from "express"
import { LiftrController } from "@controllers/liftr.controller"

export const LiftrRoute: Router = Router()
  .get('/', LiftrController);
