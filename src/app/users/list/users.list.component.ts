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
  public identifier: string = null;
  public name: string = null;
  public country: string = null;
  public group: string = null;
  public profile: string = null;
  public contact: boolean = null;
  public scope: boolean = null;
  public dataSource = new MatTableDataSource([]);

  public countryList: string[] = [
    'Spain', 'France', 'Germany', 'England'
  ];
  public groupList: string[] = [
    'All Funds', 'Tax Advice', 'Legal Advice'
  ];
  public profileList: string[] = [
    'Administrator', 'General', 'Consultation', 'Risks'
  ];

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

    if (this.identifier) {
      params.identifier = this.identifier;
    }
    if (this.name) {
      params.name = this.name;
    }
    if (this.country) {
      params.country = this.country;
    }
    if (this.group) {
      params.group = this.group;
    }
    if (this.scope) {
      params.scope = this.scope;
    }
    if (this.profile) {
      params.profile = this.profile;
    }
    if (this.contact) {
      params.contact = this.contact;
    }

    this.service
      .searchUser(params)
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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
