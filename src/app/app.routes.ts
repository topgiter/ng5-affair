import { Routes } from '@angular/router';
import { HomeComponent } from './home';

import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'inspection',  loadChildren: './inspection/inspection.module#InspectionModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'finding', loadChildren: './finding/finding.module#FindingModule' },
  { path: '**',    component: NoContentComponent },
];
