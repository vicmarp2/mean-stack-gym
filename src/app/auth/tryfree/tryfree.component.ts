import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription, Observable, zip } from 'rxjs';
import { AuthService } from '../auth.service';
import { Quota } from 'src/app/quotas/quota.model';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { addWeeks } from 'date-fns';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-tryfree',
  templateUrl: './tryfree.component.html',
  styleUrls: ['./tryfree.component.css']
})
export class TryfreeComponent implements OnInit, OnDestroy {
  alreadyExists = false;
  alreadyExistsDNI = false;
  differentPassword = false;
  userData: any = {};
  quota: Quota;
  private quotasSub: Subscription;
  userIsAuth = false;
  private authListener: Subscription;
  constructor(private authService: AuthService, private userService: UserService,
    private quotasService: QuotasService, private snackBar: MatSnackBar, private route: Router) {}

  ngOnInit() {
    this.userIsAuth = this.authService.getIsAuth();
    this.authListener = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuth = isAuthenticated;
      });
      this.quotasService.getQuotas();
      this.quotasSub = this.quotasService.getQuotasUpdateListener()
        .subscribe(transformedQoutasData => {
          this.quota = transformedQoutasData.quotas.find(quota => quota.periodInMonths === 0);
        });
  }


  onTryfree(form: NgForm) {
    this.differentPassword = false;
    this.alreadyExists = false;
    this.alreadyExistsDNI = false;
    if (form.invalid) {
      return;
    }
    if (this.userData.password !== this.userData.confirmPassword) {
      this.differentPassword = true;
      return;
    }
    const duplicatedEmail$: Observable<boolean> = this.userService.checkDuplicatedUser(this.userData.email);
    const duplicatedDNI$: Observable<boolean> = this.userService.checkDuplicatedDNI(this.userData.dni);

    zip(duplicatedEmail$, duplicatedDNI$)
      .subscribe(([duplicatedEmail, duplicatedDNI]) => {
        this.alreadyExists = duplicatedEmail;
        this.alreadyExistsDNI = duplicatedDNI;
        if (duplicatedEmail || duplicatedDNI) {
          return;
        }
        this.snackBar.open(`Gracias ${form.value.name}. La petición ha sido enviada con éxito`, '', {
          duration: 1000,
        });
        const freeUser = {
          dni: this.userData.dni,
          email: this.userData.email,
          password: this.userData.password,
          name: this.userData.name,
          surname: this.userData.surname,
          quota: this.quota,
          purchaseDate: new Date(),
          endDate: addWeeks(new Date(), 1),
        };
        this.authService.createFreeUser(freeUser);
      });
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
    this.quotasSub.unsubscribe();
  }
}
