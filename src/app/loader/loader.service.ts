import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
  public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  public show() {
    this.spinnerSubject.next(true);
  }

  public hide() {
    this.spinnerSubject.next(false);
  }

  public getMessage() {
    return this.spinnerSubject.asObservable();
  }
}
