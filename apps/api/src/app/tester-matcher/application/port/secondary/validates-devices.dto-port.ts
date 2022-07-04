import {Observable} from "rxjs";

export const VALIDATES_DEVICES_DTO_PORT = Symbol('VALIDATES_DEVICES_DTO_PORT');

export interface ValidatesDevicesDtoPort {
  checkIds(...ids: number[]): Observable<boolean>;
}
