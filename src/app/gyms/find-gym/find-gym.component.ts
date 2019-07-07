import { Component, OnInit, OnDestroy } from '@angular/core';
import { GymsService } from '../gyms.service';
import { Gym } from '../gym.model';
import { AgmMarker } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-gym',
  templateUrl: './find-gym.component.html',
  styleUrls: ['./find-gym.component.css']
})
export class FindGymComponent implements OnInit,  OnDestroy {
  mapLatitude = 40;
  mapLongitude = -3;
  mapZoom = 6.3;
  ICON = {
    // url: '../../../assets/logo/cropped-logo-herca-negro_fondoblanco_recortado_transparente.png',
    url: '../../../assets/logo/IRONSQUAT1.png',
    scaledSize: {
      width: 150,
      height: 90,
    },
  };

  mapMarkers = new Array<{gym: Gym, icon: any}>();

  gyms: Gym[];
  private gymsSub: Subscription;
  constructor(
    private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gymsService.getGyms();
    this.gymsSub = this.gymsService.getGymsUpdateListener()
      .subscribe(transformedGymData => {
      this.gyms = transformedGymData.gyms;
      this.fetchMapMarkers();
    });
  }

  fetchMapMarkers() {
    this.gyms.forEach(gym => {
      this.mapMarkers.push({
        gym,
        icon: this.ICON,
      });
    });
  }

  onMarkerClick(event: AgmMarker) {
    this.mapLatitude = event.latitude;
    this.mapLongitude = event.longitude;
    this.mapZoom = 13;
  }

  onInfoWindowClosed() {
    this.mapLatitude = 40;
    this.mapLongitude = -3;
    this.mapZoom = 6.3;
  }

  onGymSelected(gym: Gym) {
    this.router.navigate(['at', gym.codName], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.gymsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
