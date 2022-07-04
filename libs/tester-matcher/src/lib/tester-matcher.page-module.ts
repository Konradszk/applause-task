import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TesterMatcherPageComponent} from "./adapters/primary/ui/tester-macher-page/tester-matcher-page.component";

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TesterMatcherPageComponent
      }
    ])],
})
export class TesterMatcherRouterModule {
}
