import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FindsTestersDtoPort, TesterCriteria} from "../../application/port/secondary/finds-testers.dto-port";
import {map, Observable} from "rxjs";
import {TesterDTO} from "../../application/port/secondary/tester.dto";
import {stringify} from 'qs';
import {HasDataCollection} from "./json-api.interface";

@Injectable()
export class HttpTesterService implements FindsTestersDtoPort {
  private readonly _baseUrl = 'http://localhost:3333' // todo refactor
  private readonly _url: string;

  constructor(
    private _http: HttpClient
  ) {
    this._url = `${this._baseUrl}/api/testers`
  }

  findTesters(options: TesterCriteria): Observable<TesterDTO[]> {
    const params = stringify(options);
    return this._http.get<HasDataCollection<TesterDTO>>(`${this._url}?${params}`).pipe(
      map(res => res.data.map(data => data.attributes))
    );
  }
}
