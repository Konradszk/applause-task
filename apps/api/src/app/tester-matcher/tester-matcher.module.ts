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
import {TestersController} from "./adapters/primary/testers.controller";
import {GETS_TESTERS_QUERY_PORT} from "./application/port/primary/gets-testers.query-port";
import {GetsTestersQueryHandler} from "./application/query-handler/gets-testers.query-handler";
import {GETS_TESTERS_DTO_PORT} from "./application/port/secondary/gets-testers.dto-port";
import {MysqlTesterRepository} from "./adapters/secondary/mysql-tester.repository";
import {VALIDATES_DEVICES_DTO_PORT} from "./application/port/secondary/validates-devices.dto-port";
import {VALIDATES_COUNTRIES_DTO_PORT} from "./application/port/secondary/validates-countries.dto-port";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestersEntity, DevicesEntity, BugsEntity])
  ],
  controllers: [CountryController, DevicesController, TestersController],
  providers: [
    MysqlCountryRepository,
    MysqlDeviceRepository,
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
      useExisting: MysqlDeviceRepository
    },
    {
      provide: GETS_TESTERS_QUERY_PORT,
      useClass: GetsTestersQueryHandler
    },
    {
      provide: GETS_TESTERS_DTO_PORT,
      useClass: MysqlTesterRepository
    },
    {
      provide: VALIDATES_DEVICES_DTO_PORT,
      useExisting: MysqlDeviceRepository
    },
    {
      provide: VALIDATES_COUNTRIES_DTO_PORT,
      useExisting: MysqlCountryRepository
    }]
})
export class TesterMatcherModule {
}
