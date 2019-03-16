import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.model';
import { Subscription, Observable, zip } from 'rxjs';
import { Quota } from 'src/app/quotas/quota.model';
import { QuotasService } from 'src/app/quotas/quotas.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  startDate = new Date(1990, 0, 1);
  quotas: Quota[];
  selectedQuota = this.data.user.quota;
  private quotasSub: Subscription;
  private oldEmail = this.data.user.email;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
  private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { user: User },
  private quotasService: QuotasService) { }

  ngOnInit() {

    this.quotasService.getQuotas();
    this.quotasSub = this.quotasService.getQuotasUpdateListener()
      .subscribe(transformedQoutasData => {
        this.quotas = transformedQoutasData.quotas.filter((quota) => {
          if (quota.periodInMonths !== 0) {
            return quota;
          }
        });
      });
  }


  onBackClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    const emailChanged = this.data.user.email !== this.oldEmail;
    this.userService.updateUser(this.data.user, emailChanged);
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
