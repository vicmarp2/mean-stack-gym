import { Component, OnInit } from '@angular/core';

import { switchMap, map, tap } from 'rxjs/operators';
import { GymsService } from '../gyms.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Gym } from '../gym.model';
import { MatSelectChange } from '@angular/material';
import { of } from 'rxjs';
import { AgmMarker } from '@agm/core';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit {
  selectedGymCodName: string;
  selectedGym: Gym;
  gyms: Gym[];
  mapLatitude: number;
  mapLongitude: number;

  mapZoom = 17;
  ICON = {
    url: '../../../assets/logo/cropped-logo-herca-negro_fondoblanco_recortado_transparente.png',
    scaledSize: {
      width: 100,
      height: 60,
    },
  };

  mapMarkers = new Array<{gym: Gym, icon: any}>();

  constructor(private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.gyms = this.gymsService.getGyms();
    // se obtiene el gimnasio de la ruta
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('gym'))
      )
    ).subscribe((selectedGymCodName: string) => {
      if (selectedGymCodName !== 'any') {
        this.selectedGymCodName = selectedGymCodName;
        this.selectedGym = this.gymsService.getGymByCodeName(this.selectedGymCodName);
        this.mapLatitude = this.selectedGym.coordinates.latitude;
        this.mapLongitude = this.selectedGym.coordinates.longitude;
        this.fetchMapMarker();
      }
    });
  }

  onSelectionChange(newGym: MatSelectChange) {
    this.router.navigate(['gyms', 'at', newGym.value.codName]);
  }

  fetchMapMarker() {
      this.mapMarkers.push({
        gym: this.selectedGym,
        icon: this.ICON,
      });
    }

  onQuotasClick() {
    this.router.navigate(['quotas']);
  }
}
