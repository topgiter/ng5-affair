import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FindingService } from '../finding.service';

@Component({
  selector: 'finding-delete-confirm-dialog',
  templateUrl: 'finding.delete.confirm.dialog.html',
  styleUrls: ['finding.list.component.scss'],
})
export class FindingDeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FindingDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: FindingService
  ) { }

  public close(value): void {
    this.dialogRef.close(value);
  }
}
