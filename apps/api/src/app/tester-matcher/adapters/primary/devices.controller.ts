import {Controller, Get, Inject} from '@nestjs/common';
import {map, Observable} from "rxjs";
import {
  GETS_ALL_DEVICES_QUERY_PORT,
  GetsAllDevicesQueryPort
} from "../../application/port/primary/gets-all-devices.query-port";
import {DeviceCollectionJsonApi} from "./response/device-collection.json-api";

@Controller('devices')
export class DevicesController {
  constructor(@Inject(GETS_ALL_DEVICES_QUERY_PORT) private _getsDevices: GetsAllDevicesQueryPort) {
  }

  @Get()
  public getAllDevices(): Observable<DeviceCollectionJsonApi> {
    return this._getsDevices.getAllDevices().pipe(
      map(queries => DeviceCollectionJsonApi.fromQueries(queries))
    );
  }
}

