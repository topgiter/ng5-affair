// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './users.routes';
import { SharedModule } from '../services/shared.module';

// Components
import { UsersComponent } from './users.component';
import { UsersListComponent } from './list';
import { UsersCreateComponent } from './create';
import { UsersEditComponent } from './edit';
import { UserDeleteConfirmDialogComponent } from './list/user.delete.confirm.dialog';

// Services
import { UsersService } from './users.service';

// Angular Material Modules
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule,
} from '@angular/material';

import { MomentModule } from 'angular2-moment';

/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersEditComponent,
    UsersCreateComponent,
    UserDeleteConfirmDialogComponent,
  ],
  entryComponents: [
    UserDeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,

    MomentModule,

    RouterModule.forChild(routes),
  ],
  providers: [
    UsersService,
  ],
})
export class UsersModule {
  constructor() {
    // console.log('`InspectionModule` module initialized');
  }
}
