import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ap-delete-confirm-dialog',
  templateUrl: 'ap.delete.confirm.dialog.html',
  styleUrls: ['finding.list.component.scss'],
})
export class APDeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<APDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public close(value): void {
    this.dialogRef.close(value);
  }
}
