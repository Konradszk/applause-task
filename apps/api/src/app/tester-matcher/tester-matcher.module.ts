import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestersEntity} from "./adapters/secondary/entity/testers.entity";
import {DevicesEntity} from "./adapters/secondary/entity/devices.entity";
import {BugsEntity} from "./adapters/secondary/entity/bugs.entity";
import {CountryController} from "./adapters/primary/country.controller";
import {GETS_COUNTRIES_QUERY_PORT} from "./application/port/primary/gets-countries.query-port";
import {GetsCountriesQueryHandler} from "./application/query-handler/gets-countries.query-handler";
import {GETS_COUNTRIES_DTO_PORT} from "./application/port/secondary/gets-countries.dto-port";
import {MysqlCountryRepository} from "./adapters/secondary/mysql-country.repository";
import {GETS_ALL_DEVICES_QUERY_PORT} from "./application/port/primary/gets-all-devices.query-port";
import {GetsAllDevicesQueryHandler} from "./application/query-handler/gets-all-devices.query-handler";
import {GETS_ALL_DEVICES_DTO_PORT} from "./application/port/secondary/gets-all-devices.dto-port";
import {MysqlDeviceRepository} from "./adapters/secondary/mysql-device.repository";
import {DevicesController} from "./adapters/primary/devices.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestersEntity, DevicesEntity, BugsEntity])
  ],
  controllers: [CountryController, DevicesController],
  providers: [
    MysqlCountryRepository,
    {
      provide: GETS_COUNTRIES_QUERY_PORT,
      useClass: GetsCountriesQueryHandler
    },
    {
      provide: GETS_COUNTRIES_DTO_PORT,
      useExisting: MysqlCountryRepository
    },
    {
      provide: GETS_ALL_DEVICES_QUERY_PORT,
      useClass: GetsAllDevicesQueryHandler
    },
    {
      provide: GETS_ALL_DEVICES_DTO_PORT,
      useClass: MysqlDeviceRepository
    }]
})
export class TesterMatcherModule {
}
