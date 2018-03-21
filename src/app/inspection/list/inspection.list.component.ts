import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Inspection } from '../Inspection';
import { InspectionService } from '../inspection.service';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'inspection-list',
  styleUrls: ['inspection.list.component.scss'],
  templateUrl: 'inspection.list.component.html',
})
export class InspectionListComponent implements AfterViewInit, OnInit {
  public showResult: boolean = true;
  public displayedColumns = [
    'id', 'geography', 'supervisoryAuthority', 'unitSubsidiary', 'dateOfCommunication',
    'scope', 'riskType', 'status', 'reportDate', 'inspectionResult', 'actions'
  ];
  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private service: InspectionService) {}

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
}
