import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {TesterQuery} from "./tester.query";

export const GETS_TESTERS_QUERY_PORT = new InjectionToken<GetsTestersQueryPort>('GETS_TESTERS_QUERY_PORT');

export interface GetsTestersQueryPort {
  getTesters(): Observable<TesterQuery[] | undefined>
}
