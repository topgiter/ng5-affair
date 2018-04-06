// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './finding.routes';
import { SharedModule } from '../services/shared.module';

// Components
import { FindingComponent } from './finding.component';
import { FindingListComponent } from './list';
import { FindingCreateDialogComponent } from './create';
import { FindingEditDialogComponent } from './edit';

// Services
import { FindingService } from './finding.service';

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
  MatTabsModule,
} from '@angular/material';

import { MomentModule } from 'angular2-moment';

/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [
    FindingComponent,
    FindingListComponent,
    FindingCreateDialogComponent,
    FindingEditDialogComponent,
  ],
  entryComponents: [
    FindingCreateDialogComponent,
    FindingEditDialogComponent,
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
    MatTabsModule,

    MomentModule,

    RouterModule.forChild(routes),
  ],
  providers: [
    FindingService,
  ],
})
export class FindingModule {
  constructor() {
    // console.log('`InspectionModule` module initialized');
  }
}
