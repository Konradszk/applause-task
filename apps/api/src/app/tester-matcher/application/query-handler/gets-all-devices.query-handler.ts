import {GetsAllDevicesQueryPort} from "../port/primary/gets-all-devices.query-port";
import {Inject, Injectable} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {DeviceQuery} from "../port/primary/device.query";
import {GETS_ALL_DEVICES_DTO_PORT, GetsAllDevicesDtoPort} from "../port/secondary/gets-all-devices.dto-port";

@Injectable()
export class GetsAllDevicesQueryHandler implements GetsAllDevicesQueryPort {

  constructor(@Inject(GETS_ALL_DEVICES_DTO_PORT) private _getsDevices: GetsAllDevicesDtoPort) {
  }

  getAllDevices(): Observable<DeviceQuery[]> {
    return this._getsDevices.getAllDevices().pipe(
      map(dtos => dtos.map(dto => new DeviceQuery(dto.id, dto.name)))
    );
  }

}
