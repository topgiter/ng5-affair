import { Routes } from '@angular/router';

import { InspectionComponent } from './inspection.component';
import { InspectionCreateComponent } from './create';
import { InspectionListComponent } from './list';

export const routes: Routes = [
  { path: '', redirectTo: '/inspection/list' },
  { path: 'create', component: InspectionCreateComponent },
  { path: 'list', component: InspectionListComponent },
];
