import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Quota } from './quota.model';


@Injectable({ providedIn: 'root' })
export class QuotasService {
  // esto se guardará en la base de datos
  private quotas: Quota[]  = [
    {
      title: 'Bono 1 día',
      numberOfPayments: 1,
      pricePerMonth: 5,
      periodInMonths: 0,
      isCardNeeded: false,
      cardPrice: 0,
    },
    {
      title: 'Cuota 1 mes',
      numberOfPayments: 1,
      pricePerMonth: 25,
      periodInMonths: 1,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 3 meses',
      numberOfPayments: 3,
      pricePerMonth: 20,
      periodInMonths: 3,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 6 meses',
      numberOfPayments: 6,
      pricePerMonth: 15,
      periodInMonths: 6,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 12 meses',
      numberOfPayments: 12,
      pricePerMonth: 10,
      periodInMonths: 12,
      isCardNeeded: true,
      cardPrice: 10,
    },
  ];

  constructor(private router: Router) {}

  getQuotas() {
    return [...this.quotas];
  }

}
