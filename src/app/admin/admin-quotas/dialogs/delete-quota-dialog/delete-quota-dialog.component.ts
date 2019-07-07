import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuotasService } from 'src/app/quotas/quotas.service';

@Component({
  selector: 'app-delete-quota-dialog',
  templateUrl: './delete-quota-dialog.component.html',
  styleUrls: ['./delete-quota-dialog.component.css']
})
export class DeleteQuotaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteQuotaDialogComponent>,
    private quotasService: QuotasService,  @Inject(MAT_DIALOG_DATA) public data: { ids: Array<string> }) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.data.ids.forEach(id => {
      this.quotasService.deleteQuota(id);
    });
    this.dialogRef.close();
  }
}
