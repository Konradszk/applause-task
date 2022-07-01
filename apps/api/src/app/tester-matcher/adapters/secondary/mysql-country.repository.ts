import {Repository} from "typeorm";
import {TestersEntity} from "./entity/testers.entity";
import {Country, GetsCountriesDtoPort} from "../../application/port/secondary/gets-countries.dto-port";
import {from, map, Observable} from "rxjs";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class MysqlCountryRepository  implements GetsCountriesDtoPort {
  constructor(
    @InjectRepository(TestersEntity) private repo: Repository<TestersEntity>
  ) {
  }
  getCountries(): Observable<Country[]> {
    return from(this.repo.createQueryBuilder()
      .select('country')
      .distinct(true)
      .getRawMany()).pipe(
        map(entity => entity.map(entity => entity.country)),
        map((countries: string[] ) => countries.map(country => ({name : country})))
    );
  }

}
