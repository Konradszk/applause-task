import {DeviceDTO, GetsAllDevicesDtoPort} from "../../application/port/secondary/gets-all-devices.dto-port";
import {Injectable} from "@nestjs/common";
import {from, map, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {DevicesEntity} from "./entity/devices.entity";
import {Repository} from "typeorm";

@Injectable()
export class MysqlDeviceRepository implements GetsAllDevicesDtoPort {
  constructor(
    @InjectRepository(DevicesEntity) private _repo: Repository<DevicesEntity>
  ) {
  }

  getAllDevices(): Observable<DeviceDTO[]> {
    return from(this._repo.find()).pipe(
      map(entities => entities.map(entity => ({
          id: entity.deviceId,
          name: entity.description
        })
      ))
    );
  }

}
