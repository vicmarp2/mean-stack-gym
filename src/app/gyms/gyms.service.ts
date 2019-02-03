import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Gym } from './gym.model';


@Injectable({ providedIn: 'root' })
export class GymsService {
  // esto se guardará en la base de datos
  private gyms: Gym[] = [
    {
      name: 'Herca Valencia',
      address: 'Calle 2, Valencia',
      contactNumber: '612345678',
      openingHours: {
        mondayToFriday: '06:00-01:00',
        weekend: '07:00-23:00'
      },
      coordinates: {
        latitude: 39.476645,
        longitude: -0.355231,
      }
    },
    {
      name: 'Herca Madrid',
      address: 'Calle 2, Valencia',
      contactNumber: '612345678',
      openingHours: {
        mondayToFriday: '06:00-01:00',
        weekend: '07:00-23:00'
      },
      coordinates: {
        latitude: 40.415666,
        longitude: -3.711124,
      }
    },
    {
      name: 'Herca Barcelona',
      address: 'Calle 2, Valencia',
      contactNumber: '612345678',
      openingHours: {
        mondayToFriday: '06:00-01:00',
        weekend: '07:00-23:00'
      },
      coordinates: {
        latitude: 41.381082,
        longitude: 2.172335,
      }
    },
  ];

  constructor(private router: Router) {}

  getGyms() {
    return this.gyms;
  }
}
