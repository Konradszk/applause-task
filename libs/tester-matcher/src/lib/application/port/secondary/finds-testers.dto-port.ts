import {Observable} from "rxjs";
import {TesterDTO} from "./tester.dto";
import {InjectionToken} from "@angular/core";

export type TesterCriteria = {
  countryCodes: string[] | null,
  deviceIds: string[] | null;
};

export const FINDS_TESTERS_DTO_PORT = new InjectionToken<FindsTestersDtoPort>('FINDS_TESTERS_DTO_PORT')

export interface FindsTestersDtoPort {
  findTesters(options: TesterCriteria): Observable<TesterDTO[]>
}
