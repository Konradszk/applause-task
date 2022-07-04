import {GetsAllDevicesQueryPort} from "../port/primary/gets-all-devices.query-port";
import {Inject, Injectable} from "@angular/core";
import {DeviceQuery} from "../port/primary/device.query";
import {map, Observable} from "rxjs";
import {GETS_ALL_DEVICES_DTO_PORT, GetsAllDevicesDtoPort} from "../port/secondary/gets-all-devices.dto-port";

@Injectable()
export class GetsAllDeviceQueryHandler implements GetsAllDevicesQueryPort {
  constructor(@Inject(GETS_ALL_DEVICES_DTO_PORT) private _getsDevices: GetsAllDevicesDtoPort) {
  }

  getAllDevices(): Observable<DeviceQuery[]> {
    return this._getsDevices.getsAllDevices().pipe(
      map(dtos => dtos.map(dto => new DeviceQuery(dto.id.toString(), dto.name))),
      map(queries => [new DeviceQuery('ALL', 'ALL'), ...queries])
    );
  }
}
