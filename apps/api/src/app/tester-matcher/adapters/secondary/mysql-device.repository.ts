import {DeviceDTO, GetsAllDevicesDtoPort} from "../../application/port/secondary/gets-all-devices.dto-port";
import {Injectable} from "@nestjs/common";
import {from, map, Observable, of} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {DevicesEntity} from "./entity/devices.entity";
import {In, Repository} from "typeorm";
import {ValidatesDevicesDtoPort} from "../../application/port/secondary/validates-devices.dto-port";

@Injectable()
export class MysqlDeviceRepository implements GetsAllDevicesDtoPort, ValidatesDevicesDtoPort {
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

  checkIds(...ids: number[]): Observable<boolean> {
    if (!ids || !ids.length) {
      return of(true)
    }
    return from(this._repo.countBy({deviceId: In(ids)})).pipe(
      map(count => count === ids.length)
    );
  }
}
