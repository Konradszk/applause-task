import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  GETS_ALL_DEVICES_QUERY_PORT,
  GetsAllDevicesQueryPort
} from "../../../../application/port/primary/gets-all-devices.query-port";
import {Observable} from "rxjs";
import {DeviceQuery} from "../../../../application/port/primary/device.query";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  GETS_COUNTRIES_QUERY_PORT,
  GetsCountriesQueryPort
} from "../../../../application/port/primary/gets-countries.query-port";
import {CountryQuery} from "../../../../application/port/primary/country.query";
import {
  SEARCHES_TESTERS_COMMAND_PORT,
  SearchesTestersCommandPort
} from "../../../../application/port/primary/searches-testers.command-port";
import {SearchTestersCommand} from "../../../../application/port/primary/search-testers.command";
import {
  GETS_TESTERS_QUERY_PORT,
  GetsTestersQueryPort
} from "../../../../application/port/primary/gets-testers.query-port";

@Component({
  selector: 'applause-search-testers',
  templateUrl: './search-testers.component.html',
  styleUrls: ['./search-testers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTestersComponent {

  public devices$: Observable<DeviceQuery[]> = this._getsDevices.getAllDevices();
  public countries$: Observable<CountryQuery[]> = this._getsCountries.getCountries();
  public form: FormGroup = this._fb.group({
    device: new FormControl(undefined, Validators.required),
    country: new FormControl(undefined, Validators.required),
  });

  constructor(
    private _fb: FormBuilder,
    @Inject(GETS_ALL_DEVICES_QUERY_PORT) private _getsDevices: GetsAllDevicesQueryPort,
    @Inject(GETS_COUNTRIES_QUERY_PORT) private _getsCountries: GetsCountriesQueryPort,
    @Inject(SEARCHES_TESTERS_COMMAND_PORT) private _searchesTesters: SearchesTestersCommandPort,
    @Inject(GETS_TESTERS_QUERY_PORT) private _getsTesters: GetsTestersQueryPort
  ) {
  }

  search(): void {
    const data = this.form.value;
    this._searchesTesters.search(new SearchTestersCommand(data.device, data.country)).subscribe()
  }
}
