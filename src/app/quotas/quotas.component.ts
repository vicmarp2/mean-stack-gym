import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Quota } from './quota.model';
import { QuotasService } from './quotas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotas',
  templateUrl: './quotas.component.html',
  styleUrls: ['./quotas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuotasComponent implements OnInit, OnDestroy {

  quotasCards: Quota[];
  quotas: Quota[];
  private quotasSub: Subscription;
  constructor(private quotasService: QuotasService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.quotasService.getQuotas();
    this.quotasSub = this.quotasService.getQuotasUpdateListener()
    .subscribe(transformedQoutasData => {
      this.quotas = transformedQoutasData.quotas;
      this.quotasCards = this.quotas.filter((quota) => {
        if (quota.periodInMonths !== 0) {
          return quota;
        }
      });
    });
  }

  ngOnDestroy() {
    this.quotasSub.unsubscribe();
  }
}
