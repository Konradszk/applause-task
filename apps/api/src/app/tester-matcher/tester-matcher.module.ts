import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestersEntity} from "./adapters/secondary/entity/testers.entity";
import {DevicesEntity} from "./adapters/secondary/entity/devices.entity";
import {BugsEntity} from "./adapters/secondary/entity/bugs.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestersEntity, DevicesEntity, BugsEntity])
  ]
})
export class TesterMatcherModule {}
