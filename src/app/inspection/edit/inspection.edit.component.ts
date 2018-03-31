import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Inspection } from '../Inspection';
import { InspectionService } from '../inspection.service';

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
  selector: 'inspection-edit-page',
  templateUrl: './inspection.edit.component.html',
  styleUrls: ['./inspection.edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InspectionEditComponent implements OnInit {
  public inspectionId: string;

  public inspection;
  public startingDate = new FormControl(null);
  public reportDate = new FormControl(null);
  public expectedEndDate = new FormControl(null);
  public status: string = null;
  public degree: number = null;
  public degreeOfProcess: string = null;
  public owner: string = null;
  public finding: boolean = null;
  public category: string = null;
  public comments: string = null;
  public inspectionResult: string = null;

  public statusList = [ 'Upcoming', 'Ongoing', 'Concluded', 'Closed' ];
  public inspectionResultsList = [];
  public progressList = [ 'Adequate', 'Intermediate', 'Inadequate' ];
  public ownerList = ['Owner1', 'Owner2', 'Owner3'];
  public categoryList = ['Annual Inspections', 'Ad-hoc Inspections', 'Thematic review', 'Deep dive', 'IMI'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InspectionService,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.inspectionId = params['id'];
      this.getOptionsForEdit();
    });
  }

  public getOptionsForEdit() {
    this.service.getOptionsForEdit(this.inspectionId).subscribe((results) => {
      const inspection: any = results[0];
      const inspectionResults: any = results[1];
      const degreeProgress: any = results[2];

      if (inspection.startingDate) {
        this.startingDate = new FormControl(moment(inspection.startingDate));
      }
      if (inspection.reportDate) {
        this.reportDate = new FormControl(moment(inspection.reportDate));
      }
      if (inspection.expectedEndDate) {
        this.expectedEndDate = new FormControl(moment(inspection.expectedEndDate));
      }

      this.status = inspection.status;
      this.degree = inspection.degree;
      this.degreeOfProcess = inspection.degreeOfProcess;
      this.owner = inspection.owner;
      this.finding = inspection.finding;
      this.category = inspection.category;
      this.comments = inspection.comments;
      this.inspectionResult = inspection.inspectionResult;

      this.inspection = inspection;
      this.inspectionResultsList = inspectionResults.map((result) => result.id);
      this.progressList = degreeProgress.map((degree) => degree.description);
    });
  }

  public updateInspection() {
    // Prepare update params
    const changedParams: any = {
      status: this.status,
      degree: this.degree,
      degreeOfProcess: this.degreeOfProcess,
      owner: this.owner,
      finding: this.finding,
      category: this.category,
      comments: this.comments,
      inspectionResult: this.inspectionResult,
    };

    changedParams.startingDate = this.startingDate.value
      ? moment(this.startingDate.value).format('YYYY-MM-DD')
      : null;

    changedParams.reportDate = this.reportDate.value
      ? moment(this.reportDate.value).format('YYYY-MM-DD')
      : null;

    changedParams.expectedEndDate = this.expectedEndDate.value
      ? moment(this.expectedEndDate.value).format('YYYY-MM-DD')
      : null;

    const inspection = { ...this.inspection, ...changedParams };

    this.service
      .updateInspection(this.inspectionId, inspection)
      .subscribe((res: Inspection) => {
        this.snackBar.open('Updated successfully', null, {
          duration: 2000,
        });

        // Navigate to inspections list
        this.router.navigate(['inspection/list']);
      }, (error) => {
        console.log('Error', error);

        this.snackBar.open('Error occurred unexpectedly', null, {
          duration: 1500,
        });
      });
  }

  public clearInspection() {
    this.expectedEndDate.setValue(null);
    this.startingDate.setValue(null);
    this.reportDate.setValue(null);
    this.status = null;
    this.degree = null;
    this.degreeOfProcess = null;
    this.owner = null;
    this.finding = null;
    this.category = null;
    this.comments = null;
    this.inspectionResult = null;
  }

  public updateResult(status) {
    this.inspectionResult = status;
  }
}
