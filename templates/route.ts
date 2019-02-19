import { Router, Request, Response, NextFunction} from "express"
import { ScaffoldController } from "@controllers/scaffold.controller"

export const ScaffoldRoute: Router = Router()
  .get('/', ScaffoldController);
