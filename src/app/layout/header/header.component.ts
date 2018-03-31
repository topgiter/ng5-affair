import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public logoUrl = 'assets/img/globalinc.png';
  public ukFlag = 'assets/img/en.png';
  public esFlag = 'assets/img/es.png';
  public langFlag = 'assets/img/en.png';

  constructor(
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.translateService.selectLanguage('en');
  }

  public handleChangeLang(lang) {
    this.langFlag = 'assets/img/' + lang + '.png';
    this.translateService.selectLanguage(lang);
  }
}
