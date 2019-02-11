import { Component, OnInit } from '@angular/core';
import { Gym } from '../gyms/gym.model';
import { GymsService } from '../gyms/gyms.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {


  selectedGymCodName: string;
  selectedGym: Gym;
  gyms: Gym[];

  constructor(private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.gyms = this.gymsService.getGyms();
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

  onSelectionChange(newGym: MatSelectChange) {
    this.router.navigate(['activities', 'at', newGym.value.codName]);
  }

}
