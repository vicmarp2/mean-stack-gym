import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Quota } from 'src/app/quotas/quota.model';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { Subscription, Observable, zip } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.model';
import { addMonths } from 'date-fns';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLinear = true;
  alreadyExists = false;
  alreadyExistsDNI = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  startDate = new Date(1990, 0, 1);
  quotas: Quota[];
  selectedQuota: Quota;
  userData: any = {};
  private quotasSub: Subscription;
  userProblem = false;

  constructor(private authService: AuthService, private userService: UserService,
    private formBuilder: FormBuilder, private quotasService: QuotasService) { }

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
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: [null, Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: [null, Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: [null, Validators.required]
    });
  }

  checkRegisterEmail(email: string, stepper: MatStepper) {
    this.alreadyExists = false;
    this.userService.checkDuplicatedUser(email)
      .subscribe((duplicated) => {
        this.alreadyExists = duplicated;
        if (duplicated) {
          stepper.previous();
        }
      }
      );
  }

  checkRegisterDNI(dni: string, stepper: MatStepper) {
    this.alreadyExistsDNI = false;
    this.userService.checkDuplicatedDNI(dni)
      .subscribe((duplicated) => {
        this.alreadyExistsDNI = duplicated;
        if (duplicated) {
          stepper.previous();
        }
      }
      );
  }

  onSignup() {
    this.alreadyExists = false;
    this.alreadyExistsDNI = false;
    const duplicatedEmail$: Observable<boolean> = this.userService.checkDuplicatedUser(this.userData.email);
    const duplicatedDNI$: Observable<boolean> = this.userService.checkDuplicatedDNI(this.userData.dni);

    zip(duplicatedEmail$, duplicatedDNI$)
      .subscribe(([duplicatedEmail, duplicatedDNI]) => {
        this.alreadyExists = duplicatedEmail;
        this.alreadyExistsDNI = duplicatedDNI;
        if (duplicatedEmail || duplicatedDNI) {
          return;
        }
        this.userProblem = false;
        const user = new User(
          'not-yet',
          this.userData.dni,
          this.userData.email,
          this.userData.password,
          this.userData.name,
          this.userData.surname,
          this.selectedQuota,
          new Date(),
          addMonths(new Date(), this.selectedQuota.periodInMonths),
          this.userData.contactNumber,
          this.userData.birthdate,
          this.userData.address,
          this.userData.postalCode,
          this.userData.city,
          this.userData.iban,
          false,
        );
        if (!(user.dni && user.email && user.name && user.surname && user.password && user.quota && user.purchaseDate && user.endDate &&
          user.contactNumber && user.birthdate && user.address && user.postalCode && user.city && user.iban)) {
          this.userProblem = true;
          return;
        }
        this.authService.createUser(user);
      });

  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
