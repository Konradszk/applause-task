import { Module } from '@nestjs/common';
import {TesterMatcherModule} from "./tester-matcher/tester-matcher.module";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [TesterMatcherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      synchronize: false,
      autoLoadEntities: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
