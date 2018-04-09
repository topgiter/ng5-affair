import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
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
import { Inspection } from '../../inspection/Inspection';
import { FindingService } from '../finding.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingCreateDialogComponent } from '../create';
import { FindingEditDialogComponent } from '../edit';
import { FindingDeleteConfirmDialogComponent } from '../../finding/list/finding.delete.confirm.dialog';

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
export class FindingListComponent implements AfterViewInit, OnInit {
  public inspectionId: string = null;
  public inspection: Inspection = null;
  public findings: Finding = null;
  public showResult: boolean = true;

  public findingId: string = null;
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

  public displayedColumns = [
    'id', 'supervisor', 'title', 'description', 'riskType', 'criticality', 'endDate',
    'modifiedEndDate', 'endDateComments', 'geography', 'functional', 'actions'
  ];

  constructor(
    private service: FindingService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
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

    this.service
      .searchFinding(params)
      .subscribe((findings: Finding[]) => {
        this.dataSource = new MatTableDataSource<Finding>(findings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  public updateCriticality(status) {
    this.criticality = status;
  }

  public getFindings() {
    this.service
      .getFindings(this.inspectionId)
      .subscribe((findings: Finding[]) => {
        this.dataSource = new MatTableDataSource<Finding>(findings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  public getInspectionAndFindings() {
    this.service.getInspectionAndFindings(this.inspectionId).subscribe((results) => {
      const inspection: any = results[0];
      const findings: any = results[1];

      this.inspection = inspection;

      this.dataSource = new MatTableDataSource<Finding>(findings);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  public openEditFinding(findingId) {
    const dialogRef = this.dialog.open(FindingEditDialogComponent, {
      width: '70%',
      data: {
        inspectionId: this.inspectionId,
        findingId: findingId
      }
    });

    dialogRef.afterClosed().subscribe((isCreated) => {
      if (isCreated) {
        this.getFindings();
      }
    });
  }

  public deleteFinding(finding) {
    const dialogRef = this.dialog.open(FindingDeleteConfirmDialogComponent, {
      data: { finding }
    });

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.service.deleteFinding(finding.id).subscribe((res: any) => {
          // Notify that finding was deleted successfully
          this.snackBar.open('Finding was deleted successfully.', null, {
            duration: 3000,
          });

          // Retrieve updated finding list
          this.getFindings();
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
        'Id', 'Supervisor ID', 'Title', 'Description', 'Risk Type', 'Criticality',
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
}
