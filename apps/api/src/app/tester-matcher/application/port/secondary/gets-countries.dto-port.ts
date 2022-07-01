import {Observable} from "rxjs";

export const GETS_COUNTRIES_DTO_PORT = Symbol('GETS_COUNTRIES_DTO_PORT');

export interface Country {
  name: string;
}

export interface GetsCountriesDtoPort {
  getCountries(): Observable<Country[]>
}
