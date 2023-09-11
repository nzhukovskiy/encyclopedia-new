import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as process from "process";

type configType = {
    pg: TypeOrmModuleOptions
}
const configuration : configType = {
    pg: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'postgres',
        entities: [],
        synchronize: true
    },
};

export default configuration;