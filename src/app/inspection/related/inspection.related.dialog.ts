import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { LoaderService } from '../../loader/loader.service';

import { InspectionService } from '../inspection.service';
import { Document } from '../Document';

@Component({
  selector: 'inspection-related-dialog',
  templateUrl: 'inspection.related.dialog.html',
  styleUrls: ['./inspection.related.dialog.scss']
})
export class InspectionRelatedDialogComponent implements OnInit {
  public documents: Document[] = [];

  constructor(
    public dialogRef: MatDialogRef<InspectionRelatedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: InspectionService,
    private loader: LoaderService,
  ) { }

  public ngOnInit() {
    this.getDocuments();
  }

  public getDocuments() {
    this.loader.show();

    this.service
      .getRelatedDocuments(this.data.inspection.id)
      .subscribe((docs: Document[]) => {
        this.documents = docs;

        setTimeout(() => {
          this.loader.hide();
        }, 512);
      });
  }

  public close(): void {
    this.dialogRef.close(this.data.inspection);
  }

  public downloadDocuments() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [ 'Manager Name', 'SubCategory', 'from', 'owner, geography, entity, docDate' ]
    };

    const exportData = this.documents.map((d: Document) => {
      const { docManagName, subCategory, from, owner, geography, entity, docDate } = d;
      return { docManagName,  subCategory, from, owner, geography, entity, docDate };
    });

    const csv = new Angular5Csv(exportData, 'Documents.csv', options);
  }
}
