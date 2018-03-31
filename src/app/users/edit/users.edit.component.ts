import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { User } from '../User';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'users-edit-page',
  templateUrl: './users.edit.component.html',
  styleUrls: ['./users.edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  public user: User = null;
  public userId: string = null;
  public name: string = null;
  public country: string = null;
  public group: string = null;
  public profile: string = null;
  public contact: boolean = null;
  public nameControl: FormControl = new FormControl();
  public countryControl: FormControl = new FormControl();

  public countryList: string[] = [
    'Spain', 'France', 'Germany', 'England'
  ];
  public groupList: string[] = [
    'All Funds', 'Tax Advice', 'Legal Advice'
  ];
  public profileList: string[] = [
    'Administrator', 'General', 'Consultation', 'Risks'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUser();
    });
  }

  public getUser() {
    this.service.getUser(this.userId).subscribe((user: User) => {
      this.user = user;
      this.name = user.name;
      this.country = user.country;
      this.group = user.group;
      this.profile = user.profile;
      this.contact = user.contact;
    });
  }

  public updateUser() {
    // Check Required form fields
    if (this.checkValidation() === false) {
      this.snackBar.open('Please fill in the required fields', null, {
        duration: 1500,
      });

      return;
    }

    // Prepare user params
    const user: User = this.user;

    user.name = this.name;
    user.country = this.country;
    user.group = this.group;
    user.profile = this.profile;
    user.contact = this.contact;

    // Update user
    this.service
      .updateUser(this.userId, user)
      .subscribe((res: User) => {
        this.snackBar.open('Updated a user "' + res.name + '" successfully', null, {
          duration: 2000,
        });

        // Navigate to users list
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
    this.country = null;
    this.group = null;
    this.profile = null;
    this.contact = null;
  }

  private checkValidation(): boolean {
    if (!this.name || !this.country ) {
      this.nameControl.markAsTouched();
      this.countryControl.markAsTouched();

      return false;
    }

    return true;
  }
}
