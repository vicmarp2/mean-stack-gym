import { Component, OnInit } from '@angular/core';
import { Gym } from '../gyms/gym.model';
import { GymsService } from '../gyms/gyms.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  theme = 'light-theme';

  selectedGymCodName: string;
  selectedGym: Gym;
  gyms: Gym[];

  constructor(private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router, private overlayContainer: OverlayContainer) { }

  ngOnInit() {
     // se cambia el tema del overlay del select
     this.overlayContainer.getContainerElement().classList.add(this.theme);
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
