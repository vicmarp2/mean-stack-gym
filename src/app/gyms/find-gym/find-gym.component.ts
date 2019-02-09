import { Component, OnInit } from '@angular/core';
import { GymsService } from '../gyms.service';
import { Gym } from '../gym.model';
import { AgmMarker } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-gym',
  templateUrl: './find-gym.component.html',
  styleUrls: ['./find-gym.component.css']
})
export class FindGymComponent implements OnInit {
  mapLatitude = 40;
  mapLongitude = -3;
  mapZoom = 6.3;
  ICON = {
    url: '../../../assets/logo/cropped-logo-herca-negro_fondoblanco_recortado_transparente.png',
    scaledSize: {
      width: 100,
      height: 60,
    },
  };

  mapMarkers = new Array<{gym: Gym, icon: any}>();

  gyms: Gym[];

  constructor(
    private gymsService: GymsService, private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gyms = this.gymsService.getGyms();
    this.fetchMapMarkers();
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
    this.router.navigate([gym.codName]);
  }

}
