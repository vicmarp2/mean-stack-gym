import { Component, OnInit } from '@angular/core';
import { Gym } from '../gyms/gym.model';
import { GymsService } from '../gyms/gyms.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Activity } from '../shared/models/activity.model';
import { ActivitiesService } from '../shared/services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {



  activities: Activity[];

  constructor(private activitiesService: ActivitiesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.activities = this.activitiesService.getActivities();
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

}
