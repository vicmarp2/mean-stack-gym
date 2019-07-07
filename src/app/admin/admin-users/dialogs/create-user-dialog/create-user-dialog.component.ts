import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Quota } from 'src/app/quotas/quota.model';
import { Subscription, Observable, zip } from 'rxjs';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { User } from 'src/app/user/user.model';
import { addMonths } from 'date-fns';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {

  user: any = {};
  startDate = new Date(1990, 0, 1);
  quotas: Quota[];
  selectedQuota: Quota;
  private quotasSub: Subscription;

  constructor(public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService, public authService: AuthService,
    private quotasService: QuotasService) { }

  ngOnInit() {
    this.user.isAdmin = false;
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

  onCreateClick() {
    const duplicatedEmail$: Observable<boolean> = this.userService.checkDuplicatedUser(this.user.email);
    const duplicatedDNI$: Observable<boolean> = this.userService.checkDuplicatedDNI(this.user.dni);

    zip(duplicatedEmail$, duplicatedDNI$)
      .subscribe(([duplicatedEmail, duplicatedDNI]) => {
        if (duplicatedEmail || duplicatedDNI) {
          return;
        }
      const newUser = new User(
        'not-yet',
        this.user.dni,
        this.user.email,
        this.user.password,
        this.user.name,
        this.user.surname,
        this.selectedQuota,
        new Date(),
        addMonths(new Date(), this.selectedQuota.periodInMonths),
        this.user.contactNumber,
        this.user.birthdate,
        this.user.address,
        this.user.postalCode,
        this.user.city,
        this.user.iban,
        this.user.isAdmin,
        );
        console.log(newUser);
      this.authService.createUser(newUser);
      this.dialogRef.close();
    });
  }

  setAdminValue(event) {
    this.user.isAdmin = event.checked ? true : false;
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
