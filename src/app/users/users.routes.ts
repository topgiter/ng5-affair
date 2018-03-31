import { Routes } from '@angular/router';

import { UsersListComponent } from './list';
import { UsersCreateComponent } from './create';
import { UsersEditComponent } from './edit';

export const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'create', component: UsersCreateComponent },
  { path: 'edit/:id', component: UsersEditComponent },
  { path: '', redirectTo: '/users/list' },
];
