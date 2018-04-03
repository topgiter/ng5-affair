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

import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Finding } from '../Finding';
import { Inspection } from '../../inspection/Inspection';
import { FindingService } from '../finding.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingCreateDialogComponent } from '../create';

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

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openCreateDialog() {
    const dialogRef = this.dialog.open(FindingCreateDialogComponent, {
      width: '70%',
      data: { inspectionId: this.inspectionId }
    });

    dialogRef.afterClosed().subscribe((isCreated) => {
      if (isCreated) {
        this.service
          .getFindings(this.inspectionId)
          .subscribe((findings: Finding[]) => {
            this.dataSource = new MatTableDataSource<Finding>(findings);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
