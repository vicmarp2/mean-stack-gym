import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gym } from '../gyms/gym.model';
import { GymsService } from '../gyms/gyms.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Activity } from '../shared/models/activity.model';
import { ActivitiesService } from '../shared/services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {



  activities: Activity[];
  activitiesSub: Subscription;

  constructor(private activitiesService: ActivitiesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.activitiesService.getActivities();
    this.activitiesSub = this.activitiesService.getActivitiesUpdateListener()
      .subscribe(transformedQoutasData => {
        this.activities = transformedQoutasData.activities;
      });

    // se obtiene el gimnasio de la ruta
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     of(params.get('gym'))
    //   )
    // ).subscribe((selectedGymCodName: string) => {
    //   if (selectedGymCodName !== 'any') {
    //     this.selectedGymCodName = selectedGymCodName;
    //     this.selectedGym = this.gymsService.getGymByCodeName(this.selectedGymCodName);
    //   }
    // });
  }
  ngOnDestroy() {
    this.activitiesSub.unsubscribe();
  }
}
