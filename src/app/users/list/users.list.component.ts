import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';

import {
  MatDialog,
  MatSnackBar,
  MatPaginator,
  MatTableDataSource,
  MatSort
} from '@angular/material';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { User } from '../User';
import { UsersService } from '../users.service';
import { UserDeleteConfirmDialogComponent } from './user.delete.confirm.dialog';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'users-list',
  styleUrls: ['users.list.component.scss'],
  templateUrl: 'users.list.component.html',
})
export class UsersListComponent implements AfterViewInit, OnInit {
  public showResult: boolean = true;

  public dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public displayedColumns = [
    'id', 'identifier', 'name', 'country', 'group', 'profile', 'actions'
  ];

  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.service.getUsers().subscribe((res: User[]) => {
      this.dataSource = new MatTableDataSource<User>(res);
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

  public toggleSearch() {
    this.showResult = !this.showResult;

    if (this.showResult) {
      this.searchUser();
    }
  }

  public searchUser() {
    const params: any = {};

    // TODO
  }

  public deleteUser(user) {
    const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, {
      data: { user }
    });

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.service.deleteUser(user.id).subscribe((res: any) => {
          // Notify that user was deleted successfully
          this.snackBar.open('User "' + user.name + '" was deleted successfully.', null, {
            duration: 3000,
          });

          // Retrieve updated users list
          this.getUsers();
        });
      }

    });
  }

  public downloadUsers() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [ 'Id', 'Identifier', 'Name', 'Country', 'Group', 'Profile' ]
    };

    const exportData = this.dataSource.filteredData.map((d: User) => {
      const { id, identifier, name, country, group, profile } = d;

      return { id, identifier, name, country, group, profile };
    });

    const csv = new Angular5Csv(exportData, 'Users', options);
  }
}
