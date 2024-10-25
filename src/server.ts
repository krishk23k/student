import express from "express";
import * as bodyparser from "body-parser";
import { Route } from "./route";
import { DBconfig } from "./config/DBconfig";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
dotenv.config();
export class server {
    protected app: express.Application;
    constructor() {
        this.app = express();
        const port = process.env.PORT;
        const dbConfig = new DBconfig();
        dbConfig.connect();
        this.app.use(bodyparser.json({ limit: "50mb" }));
        this.app.use(bodyparser.urlencoded({ extended: true }));
        this.app.use(
            fileUpload({
                // used for file upload and to accept form-data in request
                parseNested: true,
            })
        );

        const routes = new Route();
        this.app.use(express.json())
        this.app.use("/api/v1", routes.path());
        this.app.use(bodyparser.urlencoded({ extended: true }));
        this.app.use(bodyparser.json());
        this.app.listen(port, () => {
            console.log("SERVER IS RUNNING ON : ",port);
        })
    }
}
