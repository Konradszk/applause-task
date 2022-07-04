import {GetsTestersDtoPort, TesterDTO} from "../../application/port/secondary/gets-testers.dto-port";
import {Injectable} from "@nestjs/common";
import {from, map, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {TestersEntity} from "./entity/testers.entity";
import {In, Repository} from "typeorm";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class MysqlTesterRepository implements GetsTestersDtoPort {

  constructor(
    @InjectRepository(TestersEntity) private _repo: Repository<TestersEntity>
  ) {
  }

  getsTesters(deviceIds: number[], countries: string[]): Observable<TesterDTO[]> {
    return from(
      this._repo.find({
        loadEagerRelations: true,
        relations: ['bugs'],
        where: this._buildQuery(deviceIds, countries)
      })
    ).pipe(
      map(entities => entities.map(entity => ({
        id: entity.testerId,
        firstName: entity.firstName,
        lastName: entity.lastName,
        score: entity.bugs.length
      })))
    );
  }

  private _buildQuery(deviceIds: number[], countries: string[]): FindOptionsWhere<TestersEntity> {
    const query: FindOptionsWhere<TestersEntity> = {};
    query.bugs = deviceIds ? {device: {deviceId: In(deviceIds)}} : undefined;
    query.country = countries ? In(countries) : undefined;
    return query
  }
}
