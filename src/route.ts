import * as mongoose from "mongoose";
import * as express from "express";
import * as l10n from "jm-ez-l10n";
import { studentRouter } from "./modules/students/studentRoutes";
export class Route{
    public path(){
        const router = express.Router();
        router.use('/student',studentRouter)
        return router;
    }
}