import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Quota } from './quota.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/quotas';

@Injectable({ providedIn: 'root' })
export class QuotasService {
  constructor(private http: HttpClient, private router: Router) {}

  private quotas: Quota[] = [];
  private quotasUpdated = new Subject<{ quotas: Quota[] }>();

  getQuotas() {
    return this.http
      .get<{ message: string; quotas: any }>(
        BACKEND_URL
      )
      .pipe(
        map(quotasData => {
          return {
            quotas: quotasData.quotas.map(quotas => {
              return {
                id: quotas._id,
                title: quotas.title,
                numberOfPayments: quotas.numberOfPayments,
                pricePerMonth: quotas.pricePerMonth,
                periodInMonths: quotas.periodInMonths,
                isCardNeeded: quotas.isCardNeeded,
                cardPrice: quotas.cardPrice,
              };
            }),
          };
        })
      )
      .subscribe(transformedQuotaData => {
        this.quotas = transformedQuotaData.quotas;
        this.quotasUpdated.next({
        quotas: [...this.quotas],
      });
    });
  }

  getQuotasUpdateListener() {
    return this.quotasUpdated.asObservable();
  }
}
