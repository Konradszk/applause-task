import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TesterMatcherPageComponent} from './adapters/primary/ui/tester-macher-page/tester-matcher-page.component';
import {TesterMatcherRouterModule} from './tester-matcher.page-module';
import {SearchTestersComponent} from './adapters/primary/ui/search-testers/search-testers.component';
import {MatSelectModule} from "@angular/material/select";
import {GETS_ALL_DEVICES_QUERY_PORT} from "./application/port/primary/gets-all-devices.query-port";
import {GetsAllDeviceQueryHandler} from "./application/query-handler/gets-all-device.query-handler";
import {GETS_ALL_DEVICES_DTO_PORT} from "./application/port/secondary/gets-all-devices.dto-port";
import {HttpDeviceService} from "./adapters/secondary/http-device.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {GETS_COUNTRIES_QUERY_PORT} from "./application/port/primary/gets-countries.query-port";
import {GetsCountriesQueryHandler} from "./application/query-handler/gets-countries.query-handler";
import {GETS_COUNTRIES_DTO_PORT} from "./application/port/secondary/gets-countries.dto-port";
import {HttpCountryService} from "./adapters/secondary/http-country.service";
import {SEARCHES_TESTERS_COMMAND_PORT} from "./application/port/primary/searches-testers.command-port";
import {GETS_TESTERS_QUERY_PORT} from "./application/port/primary/gets-testers.query-port";
import {TestersState} from "./application/state/testers.state";
import {TESTER_STORAGE} from "./application/port/secondary/tester.storage";
import {ReplaySubject} from "rxjs";
import {FINDS_TESTERS_DTO_PORT} from "./application/port/secondary/finds-testers.dto-port";
import {HttpTesterService} from "./adapters/secondary/http-tester.service";
import { TestersListComponent } from './adapters/primary/ui/testers-list/testers-list.component';

@NgModule({
  imports: [CommonModule,
    TesterMatcherRouterModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule, MatButtonModule,
  ],
  declarations: [TesterMatcherPageComponent, SearchTestersComponent, TestersListComponent],
  providers: [
    TestersState,
    {
      provide: GETS_ALL_DEVICES_QUERY_PORT,
      useClass: GetsAllDeviceQueryHandler
    },
    {
      provide: GETS_ALL_DEVICES_DTO_PORT,
      useClass: HttpDeviceService
    },
    {
      provide: GETS_COUNTRIES_QUERY_PORT,
      useClass: GetsCountriesQueryHandler
    },
    {
      provide: GETS_COUNTRIES_DTO_PORT,
      useClass: HttpCountryService
    },
    {
      provide: SEARCHES_TESTERS_COMMAND_PORT,
      useExisting: TestersState
    },
    {
      provide: GETS_TESTERS_QUERY_PORT,
      useExisting: TestersState
    },
    {
      provide: TESTER_STORAGE,
      useValue: new ReplaySubject(1)
    },
    {
      provide: FINDS_TESTERS_DTO_PORT,
      useClass: HttpTesterService
    }
  ]
})
export class TesterMatcherModule {
}
