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
import { FindingDeleteConfirmDialogComponent } from './list/finding.delete.confirm.dialog';
import { APDeleteConfirmDialogComponent } from './list/ap.delete.confirm.dialog';
import { APEditDialogComponent } from './ap-edit';

// Services
import { FindingService } from './finding.service';
import { TranslatePipe } from '../services/translate.pipe';

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
  MatToolbarModule,
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
    FindingDeleteConfirmDialogComponent,
    APDeleteConfirmDialogComponent,
    APEditDialogComponent,
  ],
  entryComponents: [
    FindingCreateDialogComponent,
    FindingEditDialogComponent,
    FindingDeleteConfirmDialogComponent,
    APDeleteConfirmDialogComponent,
    APEditDialogComponent,
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
    MatToolbarModule,

    MomentModule,

    RouterModule.forChild(routes),
  ],
  providers: [
    FindingService,
    TranslatePipe,
  ],
})
export class FindingModule {
  constructor() {
    // console.log('`InspectionModule` module initialized');
  }
}
