import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  DoCheck,
  ViewEncapsulation,
} from '@angular/core';

import {
  MatDialog,
  MatSnackBar,
  MatPaginator,
  MatTableDataSource,
  MatSort
} from '@angular/material';

import 'rxjs/add/operator/filter';

import { FormControl } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Finding } from '../Finding';
import { ActionPlan } from '../ActionPlan';
import { Inspection } from '../../inspection/Inspection';
import { FindingService } from '../finding.service';
import { LoaderService } from '../../loader/loader.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingCreateDialogComponent } from '../create';
import { FindingEditDialogComponent } from '../edit';
import { FindingDeleteConfirmDialogComponent } from './finding.delete.confirm.dialog';
import { APDeleteConfirmDialogComponent } from './ap.delete.confirm.dialog';
import { APEditDialogComponent } from '../ap-edit';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;

/**
 * @title Table with sorting
 */
@Component({
  selector: 'finding-list',
  styleUrls: ['finding.list.component.scss'],
  templateUrl: 'finding.list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FindingListComponent implements AfterViewInit, OnInit, DoCheck {
  public inspectionId: string = null;
  public inspection: Inspection = null;
  public findings: Finding = null;
  public showResult: boolean = true;
  public showAPResult: boolean = true;
  public showRelatedAP: boolean = false;

  public findingId: string = null;
  public selectedFindingId: string = null;
  public selectedAPId: string = null;
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

  public apId: string;
  public apSupervisor: string = null;
  public apEndDate = new FormControl(null);
  public apDetails: string = null;
  public apResponsableFunction: string = null;
  public apImplementationStatus: string = null;
  public apDegreeOfImplementation: string = null;

  public apImplementationStatusList: string[] = [
    'On track', 'Riesgo de Retraso', 'Retrasado', 'Cerrado'
  ];
  public apDegreeOfImplementatioList: string[] = [
    '0%', '25%', '50%', '75%', '100%'
  ];
  public apResponsalbeFunctionList: string[] = [
    'Custódia Escrituração', 'function - 1', 'function -2'
  ];

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

  public dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public apDataSource = new MatTableDataSource([]);
  @ViewChild('apSort') public apSort: MatSort;
  @ViewChild('apPaginator') public apPaginator: MatPaginator;

  public selectedDataSource = new MatTableDataSource([]);
  @ViewChild('selectedSort') public selectedSort: MatSort;

  public selectedAPDataSource = new MatTableDataSource([]);
  @ViewChild('selectedAPSort') public selectedAPSort: MatSort;

  public displayedColumns = [
    'id', 'supervisor', 'title', 'description', 'riskType', 'criticality', 'endDate',
    'modifiedEndDate', 'endDateComments', 'geography', 'functional', 'actions'
  ];

  public displayedAPColumns = [
    'id', 'supervisor', 'details', 'responsableFunction', 'implementationStatus',
    'degreeOfImplementation', 'endDate', 'actions'
  ];

  constructor(
    private service: FindingService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public translatePipe: TranslatePipe,
    private loader: LoaderService,
  ) {}

  public ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.inspectionId = params['inspectionId'];

        if (this.inspectionId) {
          this.getInspectionAndFindings();
        } else {
          this.router.navigate(['inspection/list']);
        }
      });

  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.apDataSource.sort = this.apSort;
    this.apDataSource.paginator = this.apPaginator;
  }

  public ngDoCheck() {
    // Translate pagination buttons

    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = this.translatePipe.transform('Items per page');
      this.paginator._intl.firstPageLabel = this.translatePipe.transform('First page');
      this.paginator._intl.nextPageLabel = this.translatePipe.transform('Next page');
      this.paginator._intl.previousPageLabel = this.translatePipe.transform('Previous page');
      this.paginator._intl.lastPageLabel = this.translatePipe.transform('Last page');
    }

    this.apPaginator._intl.itemsPerPageLabel = this.translatePipe.transform('Items per page');
    this.apPaginator._intl.firstPageLabel = this.translatePipe.transform('First page');
    this.apPaginator._intl.nextPageLabel = this.translatePipe.transform('Next page');
    this.apPaginator._intl.previousPageLabel = this.translatePipe.transform('Previous page');
    this.apPaginator._intl.lastPageLabel = this.translatePipe.transform('Last page');
  }

  public toggleSearch() {
    this.showResult = !this.showResult;

    if (this.showResult) {
      this.searchFinding();
    }
  }

  public searchFinding() {
    const params: any = {};

    if (this.findingId) {
      params.id = this.findingId;
    }
    if (this.supervisor) {
      params.supervisor = this.supervisor;
    }
    if (this.riskType) {
      params.riskType = this.riskType;
    }
    if (this.endDate.value) {
      params.endDate = moment(this.endDate.value).format('YYYY-MM-DD');
    }
    if (this.modifiedEndDate.value) {
      params.modifiedEndDate = moment(this.modifiedEndDate.value).format('YYYY-MM-DD');
    }
    if (this.criticality) {
      params.criticality = this.criticality;
    }
    if (this.geography) {
      params.geography = this.geography;
    }
    if (this.functional) {
      params.functional = this.functional;
    }
    if (this.title) {
      params.title = this.title;
    }

    this.loader.show();
    this.service
      .searchFinding(params)
      .subscribe((findings: Finding[]) => {
        this.dataSource = new MatTableDataSource<Finding>(findings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        setTimeout(() => {
          this.loader.hide();
        }, 512);
      });
  }

  public toggleAPSearch() {
    this.showAPResult = !this.showAPResult;

    if (this.showAPResult) {
      this.searchAP();
    }
  }

  public searchAP() {
    const params: any = {};

    if (this.apId) {
      params.id = this.apId;
    }
    if (this.apSupervisor) {
      params.supervisor = this.apSupervisor;
    }
    if (this.apResponsableFunction) {
      params.responsableFunction = this.apResponsableFunction;
    }
    if (this.apEndDate.value) {
      params.endDate = moment(this.apEndDate.value).format('YYYY-MM-DD');
    }
    if (this.apImplementationStatus) {
      params.implementationStatus = this.apImplementationStatus;
    }
    if (this.apDegreeOfImplementation) {
      params.degreeOfImplementation = this.apDegreeOfImplementation;
    }
    if (this.apDetails) {
      params.details = this.apDetails;
    }

    this.loader.show();

    this.service
      .searchActionPlan(params)
      .subscribe((actionPlans: ActionPlan[]) => {
        this.apDataSource = new MatTableDataSource<ActionPlan>(actionPlans);
        this.apDataSource.sort = this.apSort;
        this.apDataSource.paginator = this.apPaginator;

        setTimeout(() => {
          this.loader.hide();
        }, 512);
      });
  }

  public updateCriticality(status) {
    this.criticality = status;
  }

  public getFindings() {
    this.loader.show();

    this.service
      .getFindings(this.inspectionId)
      .subscribe((findings: Finding[]) => {
        this.dataSource = new MatTableDataSource<Finding>(findings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        if (this.showRelatedAP && this.selectedFindingId) {
          const selected: Finding = findings.find((f: Finding) => f.id === this.selectedFindingId);
          const data = selected ? [selected] : [];
          this.selectedDataSource = new MatTableDataSource<Finding>(data);
          this.selectedDataSource.sort = this.selectedSort;
        }

        setTimeout(() => {
          this.loader.hide();
        }, 512);
      });
  }

  public getActionPlans() {
    this.loader.show();

    this.service
      .getActionPlans(this.inspectionId)
      .subscribe((actionPlans: ActionPlan[]) => {
        this.apDataSource = new MatTableDataSource<ActionPlan>(actionPlans);
        this.apDataSource.sort = this.apSort;
        this.apDataSource.paginator = this.apPaginator;

        if (this.showRelatedAP && this.selectedAPId) {
          const selectedAP: ActionPlan = actionPlans.find((ap: ActionPlan) => ap.id === this.selectedAPId);
          const apData = selectedAP ? [selectedAP] : [];
          this.selectedAPDataSource = new MatTableDataSource<any>(apData);
          this.selectedAPDataSource.sort = this.selectedAPSort;
        }

        setTimeout(() => {
          this.loader.hide();
        }, 512);
      });
  }

  public getInspectionAndFindings() {
    this.loader.show();

    this.service.getInspectionAndFindings(this.inspectionId).subscribe((results) => {
      const inspection: any = results[0];
      const findings: any = results[1];
      const actionPlans: any = results[2];

      this.inspection = inspection;

      this.dataSource = new MatTableDataSource<Finding>(findings);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.apDataSource = new MatTableDataSource<ActionPlan>(actionPlans);
      this.apDataSource.sort = this.apSort;
      this.apDataSource.paginator = this.apPaginator;

      setTimeout(() => {
        this.loader.hide();
      }, 512);
    });
  }

  public openCreateDialog() {
    const dialogRef = this.dialog.open(FindingCreateDialogComponent, {
      width: '70%',
      data: { inspectionId: this.inspectionId }
    });

    dialogRef.afterClosed().subscribe((isUpdated) => {
      if (isUpdated) {
        this.getFindings();
      }
    });
  }

  public openEditFinding(id) {
    const dialogRef = this.dialog.open(FindingEditDialogComponent, {
      width: '70%',
      data: {
        inspectionId: this.inspectionId,
        findingId: id
      }
    });

    dialogRef.afterClosed().subscribe((isCreated) => {
      if (isCreated) {
        this.getFindings();
      }
    });
  }

  public openEditAP(id) {
    const dialogRef = this.dialog.open(APEditDialogComponent, {
      width: '70%',
      data: {
        inspectionId: this.inspectionId,
        apId: id
      }
    });

    dialogRef.afterClosed().subscribe((isCreated) => {
      if (isCreated) {
        this.getActionPlans();
      }
    });
  }

  public openRelatedAP(findingId) {
    this.showRelatedAP = true;
    this.selectedFindingId = findingId;

    const selected: Finding = this.dataSource.data.find((f: Finding) => f.id === findingId);
    const data: Finding[] = selected ? [selected] : [];
    this.selectedDataSource = new MatTableDataSource<Finding>(data);
    this.selectedDataSource.sort = this.selectedSort;

    this.selectedAPId = selected.actionPlanId;
    const selectedAP: ActionPlan = this.apDataSource.data.find((ap: ActionPlan) => ap.id === this.selectedAPId);
    const apData: ActionPlan[] = selectedAP ? [selectedAP] : []
    this.selectedAPDataSource = new MatTableDataSource<ActionPlan>(apData);
    this.selectedAPDataSource.sort = this.selectedAPSort;
  }

  public closeRelatedAP() {
    this.showRelatedAP = false;
  }

  public deleteFinding(finding) {
    const dialogRef = this.dialog.open(FindingDeleteConfirmDialogComponent, {
      data: { finding }
    });

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.loader.show();

        this.service.deleteFinding(finding.id).subscribe((res: any) => {
          // Notify that finding was deleted successfully
          this.snackBar.open('Finding was deleted successfully.', null, {
            duration: 3000,
          });

          this.loader.hide();
          // Retrieve updated finding list
          this.getFindings();
        });
      }

    });
  }

  public deleteAP(actionPlan) {
    const dialogRef = this.dialog.open(APDeleteConfirmDialogComponent, {
      data: { actionPlan }
    });

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.loader.show();

        this.service.deleteActionPlan(actionPlan.id).subscribe((res: any) => {
          // Notify that finding was deleted successfully
          this.snackBar.open('Action Plan was deleted successfully.', null, {
            duration: 3000,
          });

          this.loader.hide();
          // Retrieve updated finding list
          this.getActionPlans();
        });
      }

    });
  }

  public downloadFindings() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [
        'ID', 'Supervisor ID', 'Title', 'Description', 'Risk Type', 'Criticality',
        'End Date', 'Modified End Date', 'End Date Comments', 'Geography', 'Function'
      ]
    };

    const exportData = this.dataSource.filteredData.map((d: Finding) => {
      const {
        id, supervisor, title, description, riskType, criticality, endDate,
        modifiedEndDate, endDateComments, geography, functional
      } = d;

      return { id, supervisor, title, description, riskType, criticality, endDate,
        modifiedEndDate, endDateComments, geography, functional };
    });

    const csv = new Angular5Csv(exportData, 'Findings', options);
  }

  public downloadAP() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [
        'Id', 'Supervisor ID', 'Details', 'Responsable Function', 'Implementation Status',
        'Degree Of Implementation', 'End Date'
      ]
    };

    const exportData = this.apDataSource.filteredData.map((d: ActionPlan) => {
      const {
        id, supervisor, details, responsableFunction, implementationStatus,
        degreeOfImplementation, endDate
      } = d;

      return { id, supervisor, details, responsableFunction, implementationStatus,
        degreeOfImplementation, endDate };
    });

    const csv = new Angular5Csv(exportData, 'Action Plans', options);
  }
}
