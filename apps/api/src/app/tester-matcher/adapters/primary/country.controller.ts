import {Controller, Get, Inject} from '@nestjs/common';
import {
  GETS_COUNTRIES_QUERY_PORT,
  GetsCountriesQueryPort
} from "../../application/port/primary/gets-countries.query-port";
import {map, Observable} from "rxjs";
import {CountryCollectionJsonApi} from "./response/country-collection.json-api";

@Controller('countries')
export class CountryController {

  constructor(
    @Inject(GETS_COUNTRIES_QUERY_PORT) private getsCountries: GetsCountriesQueryPort
  ) {
  }
  @Get()
  public getCountries(): Observable<CountryCollectionJsonApi> {
    return this.getsCountries.getCountries().pipe(
      map(queries => CountryCollectionJsonApi.fromQueries(queries))
    )
  }
}
