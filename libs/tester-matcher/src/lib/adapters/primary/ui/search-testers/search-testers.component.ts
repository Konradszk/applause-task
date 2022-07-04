import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  GETS_ALL_DEVICES_QUERY_PORT,
  GetsAllDevicesQueryPort
} from "../../../../application/port/primary/gets-all-devices.query-port";
import {Observable} from "rxjs";
import {DeviceQuery} from "../../../../application/port/primary/device.query";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'applause-search-testers',
  templateUrl: './search-testers.component.html',
  styleUrls: ['./search-testers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTestersComponent {

  public devices$: Observable<DeviceQuery[]> = this._getsDevices.getAllDevices();
  public form: FormGroup = this._fb.group({
    device: new FormControl(undefined, Validators.required),
    country: new FormControl(undefined, Validators.required),
  });
  constructor(
    private _fb: FormBuilder,
    @Inject(GETS_ALL_DEVICES_QUERY_PORT) private _getsDevices: GetsAllDevicesQueryPort
  ) {
  }

  search(): void {
    // todo implement
  }
}
