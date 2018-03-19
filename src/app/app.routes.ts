import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AdministrationComponent } from './administration';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'inspection',  loadChildren: './inspection/inspection.module#InspectionModule' },
  { path: 'administration', component: AdministrationComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
