import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DeregisterDialogComponent } from './deregister-dialog/deregister-dialog.component';
import { Quota } from '../quotas/quota.model';
import { QuotasService } from '../quotas/quotas.service';
import { RenewDialogComponent } from './renew-dialog/renew-dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userId: string;
  user = {
    userId: '',
    quota: {
      title: 'Cuota 3 meses',
      numberOfPayments: 3,
      pricePerMonth: 20,
      periodInMonths: 3,
      isCardNeeded: true,
      cardPrice: 10,
    },
    dni: '53607620W',
    purchaseDate: new Date(2019, 1, 1),
    endDate: new Date(2019, 4, 1),
    name: 'Víctor',
    surname: 'Martínez Palomares',
    email: 'correo.vmp@gmail.com',
    contactNumber: '638903401',
    birthdate: new Date(),
    address: 'Plaza America, 5 3',
    postalCode: '46900',
    city: 'Torrent, Valencia',
    iban: '5353453453',
  };
  startDate = new Date(1990, 0, 1);
  quotas: Quota[];
  private quotasSub: Subscription;
  selectedQuota: Quota;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private quotasService: QuotasService) { }

  ngOnInit() {

    // se obtiene el usuario de la ruta
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('userId'))
      )
    ).subscribe((userId: string) => {
      if (userId) {
        this.user.userId = userId;
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
    console.log(form);
  }

  openDeregisterDialog() {
    const dialogRef = this.dialog.open(DeregisterDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRenewDialog() {
    const dialogRef = this.dialog.open(RenewDialogComponent, {
      data: {endDate : this.user.endDate, quota: this.selectedQuota}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}


