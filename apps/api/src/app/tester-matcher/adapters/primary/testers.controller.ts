import {Controller, Get, Inject, Query} from "@nestjs/common";
import {map, of} from "rxjs";
import {GETS_TESTERS_QUERY_PORT, GetsTestersQueryPort} from "../../application/port/primary/gets-testers.query-port";
import {TesterCollectionJsonApi} from "./response/tester-collection.json-api";

@Controller('testers')
export class TestersController {

  constructor(
    @Inject(GETS_TESTERS_QUERY_PORT) private _getTesters: GetsTestersQueryPort
  ) {
  }

  @Get()
  public getTesters(
    @Query('countryCodes') countries: string[],
    @Query('deviceIds') deviceIds?: string[]) { // todo validate with class-validator

    return this._getTesters.getTesters({countries: countries, deviceIds: deviceIds ? deviceIds.map(id => +id): undefined}  ).pipe(
      map(queries => TesterCollectionJsonApi.fromQueries(queries))
    )
  }
}
