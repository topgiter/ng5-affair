// Libraries
import { NgModule } from '@angular/core';

// Services
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate';

(window as any).translateService = new TranslateService();
/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [
    TranslatePipe,
  ],
  exports: [
    TranslatePipe,
  ],
  providers: [
    { provide: TranslateService, useValue: (window as any).translateService }
  ],
})
export class SharedModule {}
