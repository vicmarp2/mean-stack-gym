import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Quota } from 'src/app/quotas/quota.model';
import { QuotasService } from 'src/app/quotas/quotas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLinear = false;
  alreadyExists = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  startDate = new Date(1990, 0, 1);
  quotas: Quota[];
  selectedQuota: Quota;
  private quotasSub: Subscription;

  constructor(private formBuilder: FormBuilder, private quotasService: QuotasService) { }

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
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  checkRegisterEmail(email: NgForm, stepper: MatStepper) {
    this.alreadyExists = false;

    //todo acceder al authservice
    this.alreadyExists = false;
    if (this.alreadyExists) {
      stepper.previous();
    }
  }

  onSignup() {
    //
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
