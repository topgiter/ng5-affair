import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UsersService } from '../users.service';

@Component({
  selector: 'user-delete-confirm-dialog',
  templateUrl: 'user.delete.confirm.dialog.html',
  styleUrls: ['users.list.component.scss'],
})
export class UserDeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UsersService
  ) { }

  public close(value): void {
    this.dialogRef.close(value);
  }
}
