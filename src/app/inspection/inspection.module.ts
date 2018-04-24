// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './inspection.routes';
import { SharedModule } from '../services/shared.module';

// Components
import { InspectionComponent } from './inspection.component';
import { InspectionCreateComponent } from './create';
import { InspectionEditComponent } from './edit';
import { InspectionListComponent } from './list';
import { InspectionDetailsComponent } from './details';
import { InspectionRelatedDialogComponent } from './related';

// Services
import { InspectionService } from './inspection.service';
import { TranslatePipe } from '../services/translate.pipe';
import { LoaderService } from '../loader/loader.service';

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
    InspectionComponent,
    InspectionCreateComponent,
    InspectionEditComponent,
    InspectionListComponent,
    InspectionDetailsComponent,
    InspectionRelatedDialogComponent,
  ],
  entryComponents: [
    InspectionRelatedDialogComponent,
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
    InspectionService,
    TranslatePipe,
    { provide: LoaderService, useValue: (window as any).loaderService }
  ],
})
export class InspectionModule {
  public static routes = routes;
  constructor() {
    // console.log('`InspectionModule` module initialized');
  }
}
