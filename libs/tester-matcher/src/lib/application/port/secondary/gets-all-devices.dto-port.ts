import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export const GETS_ALL_DEVICES_DTO_PORT = new InjectionToken<GetsAllDevicesDtoPort>('GETS_ALL_DEVICES_DTO_PORT')

export interface DeviceDTO {
  id: string;
  name: string;
}

export interface GetsAllDevicesDtoPort {
  getsAllDevices(): Observable<DeviceDTO[]>
}
