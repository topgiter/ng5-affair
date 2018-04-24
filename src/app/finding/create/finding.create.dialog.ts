import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FindingService } from '../finding.service';
import { LoaderService } from '../../loader/loader.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Finding } from '../Finding';

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
  selector: 'finding-create-dialog',
  templateUrl: 'finding.create.dialog.html',
  styleUrls: ['./finding.create.dialog.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FindingCreateDialogComponent implements OnInit {
  public supervisor: string = null;
  public riskType: string = null;
  public criticality: string = null;
  public endDate = new FormControl(null);
  public modifiedEndDate = new FormControl(null);
  public geography: string = null;
  public functional: string = null;
  public title: string = null;
  public description: string = null;
  public endDateComments: string = null;

  public riskTypeControl = new FormControl();
  public functionalControl = new FormControl();
  public titleControl = new FormControl();
  public descriptionControl = new FormControl();
  public endDateCommentsControl = new FormControl();

  public riskTypeList: string[] = [
    'Credit Risk', 'Regulatory'
  ];
  public criticalityList: string[] = [
    '1', '2', '3'
  ];
  public geographyList: string[] = [
    'Brasil', 'Geography - 1', 'Geography -2'
  ];
  public functionalList: string[] = [
    'Custódia Escrituração', 'function - 1', 'function -2'
  ];

  constructor(
    public dialogRef: MatDialogRef<FindingCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: FindingService,
    private snackBar: MatSnackBar,
    private loader: LoaderService,
  ) { }

  public ngOnInit() {
    // TODO: load options list
  }

  public updateCriticality(status) {
    this.criticality = status;
  }

  public clear() {
  this.supervisor = null;
  this.riskType = null;
  this.criticality = null;
  this.endDate.setValue(null);
  this.modifiedEndDate.setValue(null);
  this.geography = null;
  this.functional = null;
  this.title = null;
  this.description = null;
  this.endDateComments = null;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public create(): void {
    // Check Required form fields
    if (this.checkValidation() === false) {
      this.snackBar.open('Please fill in the required fields', null, {
        duration: 1500,
      });

      return;
    }

    // prepare params
    const finding: Finding = {} as any;

    finding.supervisor = this.supervisor;
    finding.riskType = this.riskType;
    finding.criticality = this.criticality;
    finding.endDate = this.endDate.value
      ? moment(this.endDate.value).format('YYYY-MM-DD')
      : null;
    finding.modifiedEndDate = this.modifiedEndDate.value
      ? moment(this.modifiedEndDate.value).format('YYYY-MM-DD')
      : null;
    finding.geography = this.geography;
    finding.functional = this.functional;
    finding.title = this.title;
    finding.description = this.description;
    finding.endDateComments = this.endDateComments;

    this.loader.show();

    this.service
      .createFinding(finding)
      .subscribe((res: Finding) => {
        this.snackBar.open('Created a finding successfully', null, {
          duration: 2000,
        });

        setTimeout(() => {
          this.loader.hide();
        }, 512);

        this.dialogRef.close(true);
      }, (error) => {
        console.log('Error', error);

        setTimeout(() => {
          this.loader.hide();
        }, 512);

        this.snackBar.open('Error occurred unexpectedly', null, {
          duration: 1500,
        });
      });
  }

  private checkValidation(): boolean {
    if (
      !this.riskType || !this.criticality || !this.endDate.value || !this.functional ||
      !this.title || !this.description || !this.endDateComments
    ) {
      this.riskTypeControl.markAsTouched();
      this.endDate.markAsTouched();
      this.functionalControl.markAsTouched();
      this.titleControl.markAsTouched();
      this.descriptionControl.markAsTouched();
      this.endDateCommentsControl.markAsTouched();

      return false;
    }

    return true;
  }
}
