import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Activity } from '../models/activity.model';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  // esto se guardará en la base de datos
  private activities: Activity[] = [
    {
      id: 'Pilates',
      name: 'Pilates',
      description: '',
      events: [
        {
        id: 'Pilates_1_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 1,
      },
      {
        id: 'Pilates_2_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 2,
      },
      {
        id: 'Pilates_3_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 3,
      },
      {
        id: 'Pilates_4_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 4,
      }
    ]
  },
    {
      id: 'Boxeo',
      name: 'Boxeo',
      description: '',
      events: [
        {
          id: 'Boxeo_1_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 1,
        },
        {
          id: 'Boxeo_2_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 2,
        },
        {
          id: 'Boxeo_3_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 3,
        },
        {
          id: 'Boxeo_4_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 4,
        },
      ]
    }
  ];

  constructor(private router: Router) {}

  getActivities() {
    return this.activities;
  }

  getAllEvents() {
    const result: Activity['events'] = [];
    this.activities.forEach((activity) => {
      activity.events.forEach(event => {
        result.push(event);
      });
    });
    return result;
  }

  getActivityById(id: string): Activity {
    const result: Activity = this.activities.find(activity => {
     return activity.id === id;
    });
    return result;
  }
}
