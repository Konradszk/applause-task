import {Observable} from "rxjs";

export const GETS_TESTERS_DTO_PORT = Symbol('GETS_TESTERS_DTO_PORT');
export interface TesterDTO {
  id: number;
  firstName: string;
  lastName: string;
  score: number;
}
export interface GetsTestersDtoPort {
  getsTesters(deviceIds: number[], countries: string[]): Observable<TesterDTO[]>;
}
