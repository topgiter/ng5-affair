import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';

@Component({
  selector: 'angular-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy, OnChanges {
  public show = false;
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) { }

  public ngOnInit() {
    this.subscription = this.loaderService.getMessage()
      .subscribe((show) => {
        this.show = show;
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngOnChanges() {
    console.log('onchange', this.show);
  }
}
