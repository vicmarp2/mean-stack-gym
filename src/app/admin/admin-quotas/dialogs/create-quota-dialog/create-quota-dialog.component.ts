import { Component, OnInit } from '@angular/core';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-quota-dialog',
  templateUrl: './create-quota-dialog.component.html',
  styleUrls: ['./create-quota-dialog.component.css']
})
export class CreateQuotaDialogComponent implements OnInit {

  quota: any = {};

  constructor(public dialogRef: MatDialogRef<CreateQuotaDialogComponent>,
    private quotasService: QuotasService) { }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const newQuota = {
      ...this.quota,
    };
    this.quotasService.createQuota(newQuota);
    this.dialogRef.close();
  }
}
