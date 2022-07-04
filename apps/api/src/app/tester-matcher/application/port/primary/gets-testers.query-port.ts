import {Observable} from "rxjs";
import {TesterQuery} from "./tester.query";

export const GETS_TESTERS_QUERY_PORT = Symbol('GETS_TESTERS_QUERY_PORT')
export type TestersCriteria = {
  deviceIds?: number[];
  countries?: string[];
}
export interface GetsTestersQueryPort {
  getTesters(criteria: TestersCriteria): Observable<TesterQuery[]>
}
