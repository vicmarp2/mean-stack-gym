import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DeregisterDialogComponent } from './deregister-dialog/deregister-dialog.component';
import { Quota } from '../quotas/quota.model';
import { QuotasService } from '../quotas/quotas.service';
import { RenewDialogComponent } from './renew-dialog/renew-dialog.component';
import { User } from './user.model';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userId: string;
  user: User;
  newIban: string;
  quotas: Quota[];
  private quotasSub: Subscription;
  selectedQuota: Quota;
  startDate = new Date(1990, 0, 1);
  private oldEmail = this.user.email;


  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private quotasService: QuotasService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    // se obtiene el usuario de la ruta
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('userId'))
      )
    ).subscribe((userId: string) => {
      if (userId) {
        this.userId = userId;
        this.userService.getUser(this.userId)
          .subscribe(user => {
            this.user = user;
            this.newIban = this.user.iban;
          });
      }
    });
    this.quotasService.getQuotas();
    this.quotasSub = this.quotasService.getQuotasUpdateListener()
    .subscribe(transformedQoutasData => {
      this.quotas = transformedQoutasData.quotas.filter((quota) => {
        if (quota.periodInMonths > 0) {
          return quota;
        }
      });
    });
  }

  onSubmitPersonalForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const emailChanged = this.user.email !== this.oldEmail;
    this.userService.updateUser(this.user, emailChanged);
    this.snackBar.open(`El usuario ha sido actualizado.`, '', {
      duration: 2000,
    });
  }

  onSubmitBankForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user = this.user;
    user.iban = this.newIban;
    this.userService.updateUser(this.user, false);
    this.snackBar.open(`Su información bancaria ha sido actualizado.`, '', {
      duration: 2000,
    });
  }

  openDeregisterDialog() {
    const dialogRef = this.dialog.open(DeregisterDialogComponent, {data: {userId: this.userId}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openRenewDialog() {
    const dialogRef = this.dialog.open(RenewDialogComponent, {
      data: {userId: this.user.id, endDate : this.user.endDate, quota: this.selectedQuota}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}


