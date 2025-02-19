import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
    migrations: ["src/migrations/*.ts", "dist/migrations/*.js"],
    autoLoadEntities: true,
    synchronize: false,
}
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);