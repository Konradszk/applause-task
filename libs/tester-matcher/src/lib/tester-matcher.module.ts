import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterMatcherPageComponent } from './adapters/primary/ui/tester-macher-page/tester-matcher-page.component';
import {TesterMatcherRouterModule} from "./tester-matcher.page-module";

@NgModule({
  imports: [CommonModule,
    TesterMatcherRouterModule
  ],
  declarations: [
    TesterMatcherPageComponent
  ],
  exports: [
    TesterMatcherPageComponent
  ]
})
export class TesterMatcherModule {}
