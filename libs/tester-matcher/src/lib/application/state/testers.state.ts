import {SearchesTestersCommandPort} from "../port/primary/searches-testers.command-port";
import {GetsTestersQueryPort} from "../port/primary/gets-testers.query-port";
import {Inject, Injectable} from "@angular/core";
import {map, Observable, of, tap} from "rxjs";
import {SearchTestersCommand} from "../port/primary/search-testers.command";
import {TESTER_STORAGE, TesterStorage} from "../port/secondary/tester.storage";
import {FINDS_TESTERS_DTO_PORT, FindsTestersDtoPort, TesterCriteria} from "../port/secondary/finds-testers.dto-port";
import {TesterQuery} from "../port/primary/tester.query";

@Injectable()
export class TestersState implements SearchesTestersCommandPort, GetsTestersQueryPort {

  constructor(
    @Inject(TESTER_STORAGE) private _testerStorage: TesterStorage,
    @Inject(FINDS_TESTERS_DTO_PORT) private _findsTesters: FindsTestersDtoPort
  ) {
  }

  getTesters(): Observable<TesterQuery[] | undefined> {
    return this._testerStorage.pipe(
      map(testers => testers?.map(tester => new TesterQuery(tester.score, tester.firstName, tester.lastName)))
    );
  }

  search(command: SearchTestersCommand): Observable<void> {
    const searchData: TesterCriteria = {
      countryCodes: command.countryId !== 'ALL' ? [command.countryId] : null,
      deviceIds: command.deviceId !== 'ALL' ? [command.deviceId] : null
    };

    this._testerStorage.next(null);
    return this._findsTesters.findTesters(searchData).pipe(
      tap(dtos => this._testerStorage.next(dtos)),
      map(() => void 0)
    );
  }

}
