import {Observable} from "rxjs";
import {DeviceQuery} from "./device.query";

export const GETS_ALL_DEVICES_QUERY_PORT = Symbol('GETS_ALL_DEVICES_QUERY_PORT');

export interface GetsAllDevicesQueryPort {
  getAllDevices(): Observable<DeviceQuery[]>
}
