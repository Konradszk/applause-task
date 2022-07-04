import {Injectable} from "@angular/core";
import {CountryDTO, GetsCountriesDtoPort} from "../../application/port/secondary/gets-countries.dto-port";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {HasDataCollection} from "./json-api.interface";

@Injectable()
export class HttpCountryService implements GetsCountriesDtoPort {

  private readonly _baseUrl = 'http://localhost:3333' // todo refactor
  private readonly _url: string;

  constructor(
    private _http: HttpClient
  ) {
    this._url = `${this._baseUrl}/api/countries`
  }

  getCountries(): Observable<CountryDTO[]> {
    return this._http.get<HasDataCollection<{ name: string }>>(this._url).pipe(
      map(res => res.data.map(data => ({code: data.id})))
    );
  }
}
