import { Routes } from '@angular/router';

import { InspectionCreateComponent } from './create';
import { InspectionEditComponent } from './edit';
import { InspectionListComponent } from './list';
import { InspectionDetailsComponent } from './details';

export const routes: Routes = [
  { path: 'create', component: InspectionCreateComponent },
  { path: 'edit/:id', component: InspectionEditComponent },
  { path: 'list', component: InspectionListComponent },
  { path: 'details/:id', component: InspectionDetailsComponent },
  { path: '', redirectTo: '/inspection/list' },
];
