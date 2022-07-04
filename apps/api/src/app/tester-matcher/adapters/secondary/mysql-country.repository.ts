import {In, Repository} from "typeorm";
import {TestersEntity} from "./entity/testers.entity";
import {Country, GetsCountriesDtoPort} from "../../application/port/secondary/gets-countries.dto-port";
import {from, map, Observable, of} from "rxjs";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ValidatesCountriesDtoPort} from "../../application/port/secondary/validates-countries.dto-port";

@Injectable()
export class MysqlCountryRepository implements GetsCountriesDtoPort, ValidatesCountriesDtoPort {
  constructor(
    @InjectRepository(TestersEntity) private _repo: Repository<TestersEntity>
  ) {
  }

  getCountries(): Observable<Country[]> {
    return from(this._repo.createQueryBuilder()
      .select('country')
      .distinct(true)
      .getRawMany()).pipe(
      map(entity => entity.map(entity => entity.country)),
      map((countries: string[]) => countries.map(country => ({name: country})))
    );
  }

  checkIds(...codes: string[]): Observable<boolean> {
    if (!codes || !codes.length) {
      return of(true)
    }
    return from(from(this._repo.createQueryBuilder()
      .where({country: In(codes)})
      .select('country')
      .distinct(true)
      .getRawMany()
    )).pipe(
      map((raws: unknown[]) => raws.length === codes.length)
    );
  }

}
