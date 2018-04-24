// Libraries
import { NgModule } from '@angular/core';

// Components
import { LoaderComponent } from './loader.component';
import {
  MatProgressSpinnerModule,
} from '@angular/material';
// Services
import { LoaderService } from './loader.service';

(window as any).loaderService = new LoaderService();
/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
  ],
  exports: [
    LoaderComponent,
  ],
  providers: [
    { provide: LoaderService, useValue: (window as any).loaderService }
  ],
})
export class LoaderModule {}
