import {GetsTestersQueryPort, TestersCriteria} from "../port/primary/gets-testers.query-port";
import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {forkJoin, map, Observable, of, switchMap, throwError} from "rxjs";
import {TesterQuery} from "../port/primary/tester.query";
import {GETS_TESTERS_DTO_PORT, GetsTestersDtoPort} from "../port/secondary/gets-testers.dto-port";
import {VALIDATES_COUNTRIES_DTO_PORT, ValidatesCountriesDtoPort} from "../port/secondary/validates-countries.dto-port";
import {ValidatesDevicesDtoPort, VALIDATES_DEVICES_DTO_PORT} from "../port/secondary/validates-devices.dto-port";

@Injectable()
export class GetsTestersQueryHandler implements GetsTestersQueryPort {
  constructor(
    @Inject(GETS_TESTERS_DTO_PORT) private _getsTesters: GetsTestersDtoPort,
    @Inject(VALIDATES_COUNTRIES_DTO_PORT) private _validatesCountry: ValidatesCountriesDtoPort,
    @Inject(VALIDATES_DEVICES_DTO_PORT) private _validatesDevices: ValidatesDevicesDtoPort
  ) {
  }

  getTesters({countries, deviceIds}: TestersCriteria): Observable<TesterQuery[]> {
    return this._validate(countries, deviceIds).pipe(
      switchMap(() => this._getsTesters.getsTesters(deviceIds, countries).pipe(
        map(dtos => dtos.map(dto => new TesterQuery(dto.id, dto.firstName, dto.lastName, dto.score)))
      ))
    );
  }

  private _validate(countries?: string[], deviceIds?: number[]): Observable<void> {
    const validatesCountries = this._validatesCountry.checkIds(...countries || []).pipe(
      switchMap(result => result ? of(void 0) : throwError(() => new BadRequestException('One of countries not found'))),
    );

    const validatesDevicesIds = this._validatesDevices.checkIds(...deviceIds || []).pipe(
      switchMap(result => result ? of(void 0) : throwError(() => new BadRequestException('One of device ids not found')))
    )

    return forkJoin([
      validatesCountries,
      validatesDevicesIds
    ]).pipe(
      map(() => void 0)
    )
  }
}
