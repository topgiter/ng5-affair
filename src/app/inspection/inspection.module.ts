import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './inspection.routes';
import { InspectionComponent } from './inspection.component';
import { InspectionCreateComponent } from './create';
import { InspectionEditComponent } from './edit';
import { InspectionListComponent } from './list';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    RouterModule.forChild(routes),
  ],
})
export class InspectionModule {
  public static routes = routes;
  constructor() {
    console.log('`InspectionModule` module initialized');
  }
}
