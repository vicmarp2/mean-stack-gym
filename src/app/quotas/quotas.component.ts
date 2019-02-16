import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Quota } from './quota.model';
import { QuotasService } from './quotas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotas',
  templateUrl: './quotas.component.html',
  styleUrls: ['./quotas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuotasComponent implements OnInit {

  quotasCards: Quota[];

  constructor(private quotasService: QuotasService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.quotasCards = this.quotasService.getQuotas().filter((quota) => {
      if (quota.periodInMonths !== 0) {
        return quota;
      }
    });
  }

}
