import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  public transform(value: any, args?: any): any {
    return this.translateService.translate(value);
  }
}
