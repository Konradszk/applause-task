import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  GETS_TESTERS_QUERY_PORT,
  GetsTestersQueryPort
} from "../../../../application/port/primary/gets-testers.query-port";
import {Observable} from "rxjs";
import {TesterQuery} from "../../../../application/port/primary/tester.query";

@Component({
  selector: 'applause-testers-list',
  templateUrl: './testers-list.component.html',
  styleUrls: ['./testers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestersListComponent {

  public testers$: Observable<TesterQuery[]| undefined> = this._getsTesters.getTesters();

  constructor(
    @Inject(GETS_TESTERS_QUERY_PORT) private _getsTesters: GetsTestersQueryPort
  ) {
  }

}
