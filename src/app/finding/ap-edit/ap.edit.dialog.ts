import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FindingService } from '../finding.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActionPlan } from '../ActionPlan';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ap-edit-dialog',
  templateUrl: 'ap.edit.dialog.html',
  styleUrls: ['./ap.edit.dialog.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class APEditDialogComponent implements OnInit {
  public apId: string;
  public supervisor: string = null;
  public endDate = new FormControl(null);
  public details: string = null;
  public responsableFunction: string = null;
  public implementationStatus: string = null;
  public degreeOfImplementation: string = null;

  public responsableFunctionControl = new FormControl();
  public implementationStatusControl = new FormControl();
  public degreeOfImplementationControl = new FormControl();
  public detailsControl = new FormControl();

  public implementationStatusList: string[] = [
    'On track', 'Riesgo de Retraso', 'Retrasado', 'Cerrado'
  ];
  public degreeOfImplementatioList: string[] = [
    '0%', '25%', '50%', '75%', '100%'
  ];
  public responsalbeFunctionList: string[] = [
    'Custódia Escrituração', 'function - 1', 'function -2'
  ];

  constructor(
    public dialogRef: MatDialogRef<APEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: FindingService,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit() {
    this.apId = this.data.apId;
    this.getFinding();
  }

  public getFinding() {
    this.service
      .getActionPlan(this.apId)
      .subscribe((ap: ActionPlan) => {
        this.supervisor = ap.supervisor;
        this.details = ap.details;
        this.responsableFunction = ap.responsableFunction;
        this.implementationStatus = ap.implementationStatus;
        this.degreeOfImplementation = ap.degreeOfImplementation;
        this.endDate = ap.endDate ? new FormControl(moment(ap.endDate)) : new FormControl(null);
      });
  }

  public clear() {
    this.supervisor = null;
    this.details = null;
    this.responsableFunction = null;
    this.implementationStatus = null;
    this.degreeOfImplementation = null;
    this.endDate.setValue(null);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public update(): void {
    // Check Required form fields
    if (this.checkValidation() === false) {
      this.snackBar.open('Please fill in the required fields', null, {
        duration: 1500,
      });

      return;
    }

    // prepare params
    const ap: ActionPlan = {} as any;

    ap.supervisor = this.supervisor;
    ap.responsableFunction = this.responsableFunction;
    ap.implementationStatus = this.implementationStatus;
    ap.degreeOfImplementation = this.degreeOfImplementation;
    ap.details = this.details;
    ap.endDate = this.endDate.value
      ? moment(this.endDate.value).format('YYYY-MM-DD')
      : null;

    this.service
      .updateActionPlan(this.apId, ap)
      .subscribe((res: ActionPlan) => {
        this.snackBar.open('Updated the finding successfully', null, {
          duration: 2000,
        });

        this.dialogRef.close(true);
      }, (error) => {
        console.log('Error', error);

        this.snackBar.open('Error occurred unexpectedly', null, {
          duration: 1500,
        });
      });
  }

  private checkValidation(): boolean {
    if (
      !this.responsableFunction || !this.implementationStatus ||
      !this.degreeOfImplementation || !this.details
    ) {
      this.responsableFunctionControl.markAsTouched();
      this.degreeOfImplementationControl.markAsTouched();
      this.implementationStatusControl.markAsTouched();
      this.detailsControl.markAsTouched();

      return false;
    }

    return true;
  }
}
