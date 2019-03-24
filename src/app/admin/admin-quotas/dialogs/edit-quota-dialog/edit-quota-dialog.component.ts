import { Component, OnInit, Inject } from '@angular/core';
import { Quota } from 'src/app/quotas/quota.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuotasService } from 'src/app/quotas/quotas.service';

@Component({
  selector: 'app-edit-quota-dialog',
  templateUrl: './edit-quota-dialog.component.html',
  styleUrls: ['./edit-quota-dialog.component.css']
})
export class EditQuotaDialogComponent implements OnInit {

  quota: Quota;

  constructor(public dialogRef: MatDialogRef<EditQuotaDialogComponent>,
    private quotasService: QuotasService, @Inject(MAT_DIALOG_DATA) public data: { quota: Quota }) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    this.quotasService.updateQuota(this.data.quota);
    this.dialogRef.close();
  }
}
