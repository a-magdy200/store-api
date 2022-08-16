import { AppDataSource } from "./common/data-source"
import express from 'express';
import cors from 'cors';
import routes from "./routes";
import 'reflect-metadata'
import {existsSync, mkdirSync} from "fs";
import path from "path";
if (!existsSync('uploads/')) {
    mkdirSync('uploads/')
}
const app = express();
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', 'uploads')))
app.use(routes)
AppDataSource.initialize().then(async () => {
    app.listen(3000);
    console.log('Server is running on port 3000')
}).catch(error => console.log(error))
