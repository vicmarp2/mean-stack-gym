import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Gym } from './gym.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/gyms';

@Injectable({ providedIn: 'root' })
export class GymsService {
  constructor(private http: HttpClient, private router: Router) { }

  private gyms: Gym[] = [];
  private gymsUpdated = new Subject<{ gyms: Gym[] }>();

  getGyms() {
    return this.http
      .get<{ message: string; gyms: any }>(
        BACKEND_URL
      )
      .pipe(
        map(gymsData => {
          return {
            gyms: gymsData.gyms.map(gyms => {
              return {
                id: gyms._id,
                codName: gyms.codName,
                name: gyms.name,
                address: gyms.address,
                contactNumber: gyms.contactNumber,
                openingHours: gyms.openingHours,
                coordinates: gyms.coordinates,
              };
            }),
          };
        })
      )
      .subscribe(transformedGymData => {
        this.gyms = transformedGymData.gyms;
        this.gymsUpdated.next({
        gyms: [...this.gyms],
      });
    });
  }

  getGymByCodeName(codName: string) {
    return this.http
      .get<{ message: string; gym: any }>(
        `${BACKEND_URL}/${codName}`
      )
      .pipe(
        map(gymData => {
          return {
            gym: gymData.gym,
          };
        }));
  }

  getGymsUpdateListener() {
    return this.gymsUpdated.asObservable();
  }
}
