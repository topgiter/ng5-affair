import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public logoUrl = 'assets/img/globalinc.png';
  public ukFlag = 'assets/img/uk.png';
  public esFlag = 'assets/img/es.png';
  public langFlag = 'assets/img/es.png';
  public lang = 'es';

  public handleChangeLang(lang) {
    this.langFlag = 'assets/img/' + lang + '.png';
  }
}
