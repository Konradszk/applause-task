import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export const GETS_COUNTRIES_DTO_PORT = new InjectionToken<GetsCountriesDtoPort>('GETS_COUNTRIES_DTO_PORT');

export interface CountryDTO {
  code: string;
}
export interface GetsCountriesDtoPort {
  getCountries(): Observable<CountryDTO[]>
}
