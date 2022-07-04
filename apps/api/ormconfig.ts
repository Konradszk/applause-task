import {DataSource} from "typeorm";

const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: ['../../dist/out-tsc/**/*.entity.js'],
  migrations: [ 'migration/**/*.ts'],
  synchronize: false,
});

export default connectionSource;
