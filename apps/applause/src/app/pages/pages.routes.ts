import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tester-matcher',
    pathMatch: 'full'
  },
  {
    path: 'tester-matcher',
    loadChildren: () => import('@applause/tester-matcher').then(m => m.TesterMatcherModule)
  }
];

