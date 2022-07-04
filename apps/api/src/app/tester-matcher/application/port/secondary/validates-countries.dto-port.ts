import {Observable} from "rxjs";

export const VALIDATES_COUNTRIES_DTO_PORT = Symbol('VALIDATES_COUNTRIES_DTO_PORT');

export interface ValidatesCountriesDtoPort {
  checkIds(...codes: string[]): Observable<boolean>
}
