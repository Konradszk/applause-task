import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {SearchTestersCommand} from "./search-testers.command";

export const SEARCHES_TESTERS_COMMAND_PORT = new InjectionToken<SearchesTestersCommandPort>('SEARCHES_TESTERS_COMMAND_PORT');

export interface SearchesTestersCommandPort {
  search(command: SearchTestersCommand): Observable<void>;
}
