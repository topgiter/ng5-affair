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
  selector: 'inspection-create-page',
  templateUrl: './inspection.create.component.html',
  styleUrls: ['./inspection.create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InspectionCreateComponent implements OnInit {
  public supervisoryAuthority: string = null;
  public unitSubsidiary: any = null;
  public scope: string = null;
  public dateOfCommunication = new FormControl(null);
  public riskType: string = null;
  public subtypeRisk: string = null;
  public startingDate = new FormControl(null);
  public expectedEndDate = new FormControl(null);
  public category: string = null;
  public comments: string = null;

  public supervisoryAuthorityList = ['Admin 1', 'Admin 2'];
  public unitSubsidiaryList = [
      { entityName: 'SUBSIDIARIO DE PRUEBA - 1', 'cargabalCode': '8832' },
      { entityName: 'SUBSIDIARIO DE PRUEBA - 2', 'cargabalCode': '4556' },
    ];
  public riskTypeList = ['Financial risks - 1', 'Financial risks - 2'];
  public subtypeRiskList = ['Credit risk - 1', 'Credit risk - 2'];
  public categoryList = ['Annual Inspections', 'Ad-hoc Inspections', 'Thematic review', 'Deep dive', 'IMI'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InspectionService,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit() {
    //  TODO: fetch options list
  }

  public createInspection() {
    const inspection: Inspection = {} as any;

    inspection.supervisoryAuthority = this.supervisoryAuthority;
    inspection.unitSubsidiary = this.unitSubsidiary.entityName;
    inspection.scope = this.scope;
    inspection.riskType = this.riskType;
    inspection.subtypeRisk = this.subtypeRisk;
    inspection.category = this.category;
    inspection.comments = this.comments;
    inspection.startingDate = this.startingDate.value
      ? moment(this.startingDate.value).format('YYYY-MM-DD')
      : null;
    inspection.dateOfCommunication = this.dateOfCommunication.value
      ? moment(this.dateOfCommunication.value).format('YYYY-MM-DD')
      : null;

    inspection.expectedEndDate = this.expectedEndDate.value
      ? moment(this.expectedEndDate.value).format('YYYY-MM-DD')
      : null;

    this.service
      .createInspection(inspection)
      .subscribe((res: Inspection) => {
        this.snackBar.open('Crated a instruction successfully', null, {
          duration: 2000,
        });

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
    this.dateOfCommunication.setValue(null);
    this.category = null;
    this.comments = null;
    this.supervisoryAuthority = null;
    this.unitSubsidiary = null;
    this.scope = null;
    this.riskType = null;
    this.subtypeRisk = null;
  }
}
