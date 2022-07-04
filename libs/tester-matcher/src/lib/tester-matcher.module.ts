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

@NgModule({
  imports: [CommonModule,
    TesterMatcherRouterModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule, MatButtonModule,
  ],
  declarations: [TesterMatcherPageComponent, SearchTestersComponent],
  providers: [
    {
      provide: GETS_ALL_DEVICES_QUERY_PORT,
      useClass: GetsAllDeviceQueryHandler
    },
    {
      provide: GETS_ALL_DEVICES_DTO_PORT,
      useClass: HttpDeviceService
    }
  ]
})
export class TesterMatcherModule {
}
