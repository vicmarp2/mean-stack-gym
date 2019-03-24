import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Quota } from 'src/app/quotas/quota.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { addDays, addMonths } from 'date-fns';

export interface DialogData {
  userId: string;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    let user: User;
    this.userService.getUser(this.data.userId)
          .subscribe(userResult => {
            user = userResult;
            user.quota = this.data.quota;
            user.purchaseDate = addDays(user.endDate, 1);
            user.endDate = addMonths(user.purchaseDate, this.data.quota.periodInMonths),
            this.userService.updateUser(user, false)
            .subscribe(result => {
              console.log(result);
            });
            this.dialogRef.close();
          });
  }
  ngOnInit() {
    console.log(this.data.quota);
  }

}
