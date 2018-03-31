import { Injectable } from '@angular/core';
import * as esData from '../../assets/lang/es.json';
import * as ruData from '../../assets/lang/ru.json';
import * as itData from '../../assets/lang/it.json';

@Injectable()
export class TranslateService {

  private currentLanguage: string = 'en';

  public translate(str) {
    switch (this.currentLanguage) {
      case 'es':
        return esData[str] ? esData[str] : str;
      case 'it':
        return itData[str] ? itData[str] : str;
      case 'ru':
        return ruData[str] ? ruData[str] : str;
      default:
        return str;
    }
  }

  public selectLanguage(language: string) {
    this.currentLanguage = language;
  }
}
