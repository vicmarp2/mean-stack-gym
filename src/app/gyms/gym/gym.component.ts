import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { switchMap, map, tap } from 'rxjs/operators';
import { GymsService } from '../gyms.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Gym } from '../gym.model';
import { MatSelectChange } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { AgmMarker } from '@agm/core';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit,  OnDestroy {
  @ViewChild('matSelectedGym') matSelectedGym: any;

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

  private gymsSub: Subscription;

  constructor(private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.gymsService.getGyms();
    this.gymsSub = this.gymsService.getGymsUpdateListener()
      .subscribe(transformedGymData => {
      this.gyms = transformedGymData.gyms;
    });
    // se obtiene el gimnasio de la ruta
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('gym'))
      )
    ).subscribe((selectedGymCodName: string) => {
      if (selectedGymCodName !== 'any') {
        this.selectedGymCodName = selectedGymCodName;
        this.gymsService.getGymByCodeName(this.selectedGymCodName)
          .subscribe(transformedGymData => {
            // this.postsUpdated.next({
            //   posts: [...this.posts],
            //   postCount: transformedPostData.maxPosts
            // });
            this.selectedGym = transformedGymData.gym;
            this.mapLatitude = this.selectedGym.coordinates.latitude;
            this.mapLongitude = this.selectedGym.coordinates.longitude;
            this.fetchMapMarker();
          });
      }
    });
  }

  onSelectionChange(newGym: MatSelectChange) {
    this.router.navigate(['gyms', 'at', newGym.value]);
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

  ngOnDestroy() {
    this.gymsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
