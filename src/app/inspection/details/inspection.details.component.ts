import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  selector: 'inspection-details-page',
  templateUrl: './inspection.details.component.html',
  styleUrls: ['./inspection.details.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InspectionDetailsComponent implements OnInit {
  public inspectionId: string;

  public inspection: Inspection;
  public startingDate = null;
  public expectedEndDate = null;
  public dateOfCommunication = null;
  public status: string = null;
  public finding: boolean = null;
  public category: string = null;
  public owner: string = null;
  public reportDate = null;
  public degree: number = null;
  public inspectionResult: string = null;
  public degreeOfProcess: string = null;
  public supervisoryAuthority: string = null;
  public scope: string = null;
  public comments: string = null;
  public riskType: string = null;
  public categoryCode: string = null;
  public geography: string = null;
  public unitSubsidiary: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: InspectionService) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.inspectionId = params['id'];
      this.getInspection();
    });
  }

  public getInspection() {
    this.service
      .getInspection(this.inspectionId)
      .subscribe((res: Inspection) => {
        this.inspection = res;

        if (res.dateOfCommunication) {
          this.dateOfCommunication = moment(res.dateOfCommunication).format('DD/MM/YYYY');
        }
        if (res.reportDate) {
          this.reportDate = moment(res.reportDate).format('DD/MM/YYYY');
        }
        if (res.expectedEndDate) {
          this.expectedEndDate = moment(res.expectedEndDate).format('DD/MM/YYYY');
        }
        if (res.startingDate) {
          this.startingDate = moment(res.startingDate).format('DD/MM/YYYY');
        }

        this.riskType = res.riskType;
        this.status = res.status;
        this.finding = res.finding;
        this.category = res.category;
        this.owner = res.owner;
        this.degree = res.degree;
        this.inspectionResult = res.inspectionResult;
        this.degreeOfProcess = res.degreeOfProcess;
        this.supervisoryAuthority = res.supervisoryAuthority;
        this.scope = res.scope;
        this.comments = res.comments;
        this.categoryCode = res.categoryCode;
        this.geography = res.geography;
        this.unitSubsidiary = res.unitSubsidiary;
      });
  }
}
