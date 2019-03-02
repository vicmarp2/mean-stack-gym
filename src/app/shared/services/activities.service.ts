import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/activities';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {

  constructor(private http: HttpClient, private router: Router) {}

  private activities: Activity[] = [];
  private activitiesUpdated = new Subject<{ activities: Activity[] }>();

  getActivities() {
    return this.http
      .get<{ message: string; activities: any }>(
        BACKEND_URL
      )
      .pipe(
        map(activitiesData => {
          return {
            activities: activitiesData.activities.map(activities => {
              return {
                id: activities._id,
                name: activities.name,
                description: activities.description,
                imageUrl: activities.imageUrl,
                events: activities.events,
              };
            }),
          };
        })
      )
      .subscribe(transformedActivityData => {
        this.activities = transformedActivityData.activities;
        this.activitiesUpdated.next({
        activities: [...this.activities],
      });
    });
  }

  getActivitiesUpdateListener() {
    return this.activitiesUpdated.asObservable();
  }

  getAllEvents() {
    return this.http
      .get<{ message: string; events: any }>(
        `${BACKEND_URL}/events`
      )
      .pipe(
        map(eventsData => {
          return {
            events: eventsData.events.map(events => {
              return {
                id: events._id,
                activityName: events.activityName,
                startHour: events.startHour,
                endHour: events.endHour,
                dayOfWeek: events.dayOfWeek,
              };
            }),
          };
        })
      )

  }
}
