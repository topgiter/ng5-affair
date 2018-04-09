import { Component, ViewChild, AfterViewInit, OnInit, DoCheck } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { InspectionRelatedDialogComponent } from '../related';
import { Inspection } from '../Inspection';
import { InspectionService } from '../inspection.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;

/**
 * @title Table with sorting
 */
@Component({
  selector: 'inspection-list',
  styleUrls: ['inspection.list.component.scss'],
  templateUrl: 'inspection.list.component.html',
})
export class InspectionListComponent implements AfterViewInit, OnInit, DoCheck {
  public showResult: boolean = true;

  public displayedColumns = [
    'id', 'geography', 'supervisoryAuthority', 'unitSubsidiary', 'dateOfCommunication',
    'scope', 'riskType', 'status', 'reportDate', 'inspectionResult', 'actions'
  ];
  public supervisoryAuthorityList = [
    'Admin 1', 'Admin 2', 'Brasil-BANCO CENTRAL DO BRASIL',
    'Eurozone - Banco Central Europeo(BCE)', 'Brasil-BOVESPA MARKET SUPERVISION (BSM)'
  ];
  public unitSubsidiaryList = [
    { entityName: 'SUBSIDIARIO DE PRUEBA - 1', cargabalCode: '8832' },
    { entityName: 'SUBSIDIARIO DE PRUEBA - 2', cargabalCode: '4556' },
    { entityName: 'Brasil-Banco Brasil S.A.', cargabalCode: '1234' },
  ];
  public riskTypeList = [
    'Financial risks - 1', 'Financial risks - 2',
    'Compliance and regulatory risk', 'Risco de Crédito'
  ];
  public subtypeRiskList = ['Credit risk - 1', 'Credit risk - 2'];
  public statusList = [ 'Upcoming', 'Ongoing', 'Concluded', 'Closed' ];
  public geographyList = [ 'BRASIL', 'Geography - 1', 'Geography -2'];

  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public supervisoryAuthority: string = null;
  public unitSubsidiary: any = null;
  public dateOfCommunication = new FormControl(null);
  public riskType: string = null;
  public subtypeRisk: string = null;
  public scope: string = null;
  public geography: string = null;
  public status: string = null;
  public inspectionId: string = null;

  constructor(
    private service: InspectionService,
    private translatePipe: TranslatePipe,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.getInspections();
  }

  public getInspections() {
    this.service.getInspections().subscribe((res: Inspection[]) => {
      this.dataSource = new MatTableDataSource<Inspection>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public ngDoCheck() {
    // Translate pagination buttons
    this.paginator._intl.itemsPerPageLabel = this.translatePipe.transform('Items per page');
    this.paginator._intl.firstPageLabel = this.translatePipe.transform('First page');
    this.paginator._intl.nextPageLabel = this.translatePipe.transform('Next page');
    this.paginator._intl.previousPageLabel = this.translatePipe.transform('Previous page');
    this.paginator._intl.lastPageLabel = this.translatePipe.transform('Last page');
  }

  public openRelatedDocumentDialog(inspection) {
    const dialogRef = this.dialog.open(InspectionRelatedDialogComponent, {
      width: '60%',
      data: { inspection }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  public toggleSearch() {
    this.showResult = !this.showResult;

    if (this.showResult) {
      this.searchInspection();
    }
  }

  public searchInspection() {
    const params: any = {};

    if (this.inspectionId) {
      params.id = this.inspectionId;
    }
    if (this.supervisoryAuthority) {
      params.supervisoryAuthority = this.supervisoryAuthority;
    }
    if (this.unitSubsidiary) {
      params.unitSubsidiary = this.unitSubsidiary.entityName;
    }
    if (this.dateOfCommunication.value) {
      params.dateOfCommunication = moment(this.dateOfCommunication.value).format('YYYY-MM-DD');
    }
    if (this.scope) {
      params.scope = this.scope;
    }
    if (this.riskType) {
      params.riskType = this.riskType;
    }
    if (this.subtypeRisk) {
      params.subtypeRisk = this.subtypeRisk;
    }
    if (this.geography) {
      params.geography = this.geography;
    }
    if (this.status) {
      params.status = this.status;
    }

    this.service
      .searchInspection(params)
      .subscribe((inspections: Inspection[]) => {
        this.dataSource = new MatTableDataSource<Inspection>(inspections);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  public downloadInspections() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ['Inspection ID', 'Geography', 'Supervisory Authority', 'Unit / Subsidiary',
        'Date of the communication', 'Scope', 'Risk Type', 'Status', 'Report Date', 'Inpsection Result',
        'Degree of Implementation', 'Degree of Progress', 'Starting Date', 'Expected End Date'
      ]
    };

    const exportData = this.dataSource.filteredData.map((d: Inspection) => {
      const {
        id, geography, supervisoryAuthority, unitSubsidiary, dateOfCommunication ,
        scope, riskType, status, reportDate, inspectionResult, degree, degreeOfProcess,
        startingDate, expectedEndDate
      } = d;

      return {
        id, geography, supervisoryAuthority, unitSubsidiary, dateOfCommunication ,
        scope, riskType, status, reportDate, inspectionResult, degree, degreeOfProcess,
        startingDate, expectedEndDate
      };
    });

    const csv = new Angular5Csv(exportData, 'Inspections', options);
  }
}
