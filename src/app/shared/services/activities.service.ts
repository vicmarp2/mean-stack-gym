import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';

const BACKEND_URL = environment.apiUrl + '/activities';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {

  constructor(private http: HttpClient, private router: Router) {}

  private activities: Activity[] = [];
  private activitiesUpdated = new Subject<{ activities: Activity[] }>();
  private events: Event[] = [];
  private eventsUpdated = new Subject<{ events: Event[] }>();

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

  getEventsUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getReservationsByUser(userId: string) {
    return this.http
      .get<{ message: string; reservations: any }>(
        `${BACKEND_URL}/reservations/${userId}`
      )
      .pipe(
        map(reservationData => {
          return {
            reservations: reservationData.reservations.map(reservations => {
              return {
                id: reservations._id,
                user: reservations.user,
                exactDate: reservations.exactDate,
                event: reservations.event
              };
            }),
          };
        })
      );
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
      .subscribe(transformedEventData => {
        this.events = transformedEventData.events;
        this.eventsUpdated.next({
        events: [...this.events],
      });
    });
  }

  createActivity(activity: any) {
    this.http.post<{message: string; activity: any }>(BACKEND_URL + '/create', {activity})
    .subscribe(
      (result) => {
        console.log(result);
      }
    );
  }

  updateActivity(activity: Activity) {
    return this.http.put<{ message: string; activity: any }>(BACKEND_URL + '/edit', { activity })
    .subscribe(result => {
      console.log(result);
    });
  }

  deleteActivity(id: string) {
    return this.http
      .delete(BACKEND_URL + '/' + id)
      .subscribe(result => {
        console.log(result);
      });
  }

  createEvent(event: any) {
    this.http.post<{message: string; event: any }>(BACKEND_URL + '/create/event', {event})
    .subscribe(
      (result) => {
        console.log(result);
      }
    );
  }

  updateEvent(event: Event) {
    return this.http.put<{ message: string; event: any }>(BACKEND_URL + '/edit/event', { event })
    .subscribe(result => {
      console.log(result);
    });
  }


  deleteEvent(id: string) {
    return this.http
      .delete(BACKEND_URL + '/event/' + id)
      .subscribe(result => {
        console.log(result);
      });
  }

  createReservation(reservation: any) {
    this.http.post<{message: string; reservation: any }>(BACKEND_URL + '/create/reservation', {reservation})
    .subscribe(
      (result) => {
        console.log(result);
      }
    );
  }

  deleteReservation(id: string) {
    return this.http
      .delete(BACKEND_URL + '/reservation/' + id)
      .subscribe(result => {
        console.log(result);
      });
  }
}
