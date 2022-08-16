import "reflect-metadata"
import { DataSource } from "typeorm"
import config from './config';
export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: 3306,
    username: config.database.user,
    password: config.database.pass,
    database: config.database.name,
    synchronize: true,
    logging: false,
    entities: ["./**/entities/**.entity.ts"],
})
