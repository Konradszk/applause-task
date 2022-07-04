import {Observable} from "rxjs";

export const GETS_ALL_DEVICES_DTO_PORT = Symbol('GETS_ALL_DEVICES_DTO_PORT');

export interface DeviceDTO {
  id: number;
  name: string;
}

export interface GetsAllDevicesDtoPort {
  getAllDevices(): Observable<DeviceDTO[]>;
}
