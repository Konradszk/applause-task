import {GetsCountriesQueryPort} from "../port/primary/gets-countries.query-port";
import {Inject, Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {CountryQuery} from "../port/primary/country.query";
import {GETS_COUNTRIES_DTO_PORT, GetsCountriesDtoPort} from "../port/secondary/gets-countries.dto-port";

@Injectable()
export class GetsCountriesQueryHandler implements GetsCountriesQueryPort {
  constructor(@Inject(GETS_COUNTRIES_DTO_PORT) private _getsCountries: GetsCountriesDtoPort) {
  }

  getCountries(): Observable<CountryQuery[]> {
    return this._getsCountries.getCountries().pipe(
      map(dtos => dtos.map(dto => new CountryQuery(dto.code))),
      map(queries => [new CountryQuery('ALL'), ...queries])
    );
  }
}
