import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Quota } from 'src/app/quotas/quota.model';

export interface DialogData {
  endDate: Date;
  quota: Quota;
}


@Component({
  selector: 'app-renew-dialog',
  templateUrl: './renew-dialog.component.html',
  styleUrls: ['./renew-dialog.component.css']
})
export class RenewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
