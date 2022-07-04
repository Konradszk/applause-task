import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { routes} from './pages.routes';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PagesModule { }
