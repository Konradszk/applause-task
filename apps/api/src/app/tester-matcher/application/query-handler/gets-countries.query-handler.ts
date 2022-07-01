import {GetsCountriesQueryPort} from "../port/primary/gets-countries.query-port";
import {map, Observable} from "rxjs";
import {CountryQuery} from "../port/primary/country.query";
import {Inject, Injectable} from "@nestjs/common";
import {GETS_COUNTRIES_DTO_PORT, GetsCountriesDtoPort} from "../port/secondary/gets-countries.dto-port";

@Injectable()
export class GetsCountriesQueryHandler implements GetsCountriesQueryPort {
  constructor(
    @Inject(GETS_COUNTRIES_DTO_PORT) private _getsCountries: GetsCountriesDtoPort
  ) {
  }

  public getCountries(): Observable<CountryQuery[]> {
    return this._getsCountries.getCountries().pipe(
      map(countries => countries.map(country => new CountryQuery(country.name)))
    );
  }
}
