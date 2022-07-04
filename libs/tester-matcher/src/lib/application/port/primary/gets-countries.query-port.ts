import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {CountryQuery} from "./country.query";

export const GETS_COUNTRIES_QUERY_PORT = new InjectionToken<GetsCountriesQueryPort>('GETS_COUNTRIES_QUERY_PORT');

export interface GetsCountriesQueryPort {
  getCountries(): Observable<CountryQuery[]>
}
