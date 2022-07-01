import {Observable} from "rxjs";
import {CountryQuery} from "./country.query";

export const GETS_COUNTRIES_QUERY_PORT = Symbol('GETS_COUNTRIES_QUERY_PORT');

export interface GetsCountriesQueryPort {
  getCountries(): Observable<CountryQuery[]>
}
