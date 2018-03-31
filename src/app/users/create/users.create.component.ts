import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../User';
import { UsersService } from '../users.service';

@Component({
  selector: 'users-create-page',
  templateUrl: './users.create.component.html',
  styleUrls: ['./users.create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  public name: string = null;
  public surname: string = null;
  public country: string = null;
  public group: string = null;
  public entity: string = null;
  public location: string = null;
  public nameControl: FormControl = new FormControl();
  public surnameControl: FormControl = new FormControl();
  public locationControl: FormControl = new FormControl();
  public countryControl: FormControl = new FormControl();

  public countryList: string[] = [
    'Spain', 'France', 'Germany', 'England'
  ];
  public groupList: string[] = [
    'All Funds', 'Tax Advice', 'Legal Advice'
  ];
  public entityList: string[] = [
    'Banco Global S.A', 'Banif', 'Risks'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit() {
    //  TODO: fetch options list
  }

  public createUser() {
    // Check Required form fields
    if (this.checkValidation() === false) {
      this.snackBar.open('Please fill in the required fields', null, {
        duration: 1500,
      });

      return;
    }

    // prepare params
    const user: User = {} as any;

    user.name = this.name;
    user.surname = this.surname;
    user.country = this.country;
    user.group = this.group;
    user.entity = this.entity;
    user.location = this.location;

    this.service
      .createUser(user)
      .subscribe((res: User) => {
        this.snackBar.open('Crated a user "' + res.name + '" successfully', null, {
          duration: 2000,
        });

        this.router.navigate(['users/list']);
      }, (error) => {
        console.log('Error', error);

        this.snackBar.open('Error occurred unexpectedly', null, {
          duration: 1500,
        });
      });
  }

  public clearUser() {
    this.name = null;
    this.surname = null;
    this.country = null;
    this.group = null;
    this.entity = null;
    this.location = null;
  }

  private checkValidation(): boolean {
    if (!this.name || !this.surname || !this.country || !this.location) {
      this.nameControl.markAsTouched();
      this.surnameControl.markAsTouched();
      this.countryControl.markAsTouched();
      this.locationControl.markAsTouched();

      return false;
    }

    return true;
  }
}
