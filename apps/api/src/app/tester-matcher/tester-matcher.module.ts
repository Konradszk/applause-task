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

@Module({
  imports: [
    TypeOrmModule.forFeature([TestersEntity, DevicesEntity, BugsEntity])
  ],
  controllers: [CountryController],
  providers: [
    MysqlCountryRepository,
    {
      provide: GETS_COUNTRIES_QUERY_PORT,
      useClass: GetsCountriesQueryHandler
    },
    {
      provide: GETS_COUNTRIES_DTO_PORT,
      useExisting: MysqlCountryRepository
    }]
})
export class TesterMatcherModule {
}
