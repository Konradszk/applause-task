import {DeviceDTO, GetsAllDevicesDtoPort} from "../../application/port/secondary/gets-all-devices.dto-port";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HasDataCollection} from "./json-api.interface";

@Injectable()
export class HttpDeviceService implements GetsAllDevicesDtoPort {
  private readonly _baseUrl = 'http://localhost:3333' // todo refactor
  private readonly _url: string;

  constructor(
    private _http: HttpClient
  ) {
    this._url = `${this._baseUrl}/api/devices`
  }

  getsAllDevices(): Observable<DeviceDTO[]> {
    return this._http.get<HasDataCollection<{ name: string }>>(this._url).pipe(
      map(res => res.data.map(data => ({
        id: data.id,
        name: data.attributes.name
      })))
    );
  }

}
