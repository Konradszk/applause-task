import {SearchesTestersCommandPort} from "../port/primary/searches-testers.command-port";
import {GetsTestersQueryPort} from "../port/primary/gets-testers.query-port";
import {Inject, Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {SearchTestersCommand} from "../port/primary/search-testers.command";
import {TESTER_STORAGE, TesterStorage} from "../port/secondary/tester.storage";

@Injectable()
export class TestersState implements SearchesTestersCommandPort, GetsTestersQueryPort {

  constructor(
    @Inject(TESTER_STORAGE) private _testerStorage: TesterStorage
  ) {
  }
  getTesters(): Observable<unknown[]> {
    return of([]);
  }

  search(command: SearchTestersCommand): Observable<void> {
    return of(void 0);
  }

}
