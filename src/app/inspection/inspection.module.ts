import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './inspection.routes';
import { InspectionComponent } from './inspection.component';
import { InspectionCreateComponent } from './create';
import { InspectionEditComponent } from './edit';
import { InspectionListComponent } from './list';

import { InspectionService } from './inspection.service';

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
} from '@angular/material';

import { MomentModule } from 'angular2-moment';

/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [
    InspectionComponent,
    InspectionCreateComponent,
    InspectionEditComponent,
    InspectionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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

    MomentModule,

    RouterModule.forChild(routes),
  ],
  providers: [InspectionService],
})
export class InspectionModule {
  public static routes = routes;
  constructor() {
    console.log('`InspectionModule` module initialized');
  }
}
