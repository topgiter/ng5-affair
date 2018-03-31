import { Routes } from '@angular/router';
import { HomeComponent } from './home';

import { NoContentComponent } from './no-content';
import { FindingComponent } from './finding/finding.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'inspection',  loadChildren: './inspection/inspection.module#InspectionModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'finding', component: FindingComponent },
  { path: '**',    component: NoContentComponent },
];
