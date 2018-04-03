import { Routes } from '@angular/router';

import { FindingListComponent } from './list';

export const routes: Routes = [
  { path: 'list', component: FindingListComponent },
  { path: '', redirectTo: '/finding/list' },
];
